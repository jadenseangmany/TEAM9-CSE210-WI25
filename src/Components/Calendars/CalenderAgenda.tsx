import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, RefreshControl} from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import FirestoreService from '../../Services/FirestoreService';
import { EventData } from '../Types/Interfaces';
import TimeSelectorModal from './TimeSelectorModal';
import { Timestamp } from 'firebase/firestore';

interface Props {
  rootCollection: string;  // 'Events' or 'Clubs'
  eventDocs: string;  // 'GlobalEvents' or 'PersonalEvents'
  eventCollection: string;    // 'Date' or useremail
}

interface AgendaState {
  items: AgendaSchedule;
  selectedDate: string;
  isModalVisible: boolean;
  eventName: string;
  eventDescription: string;
  eventStartTime: string;
  eventEndTime: string;
  eventToEdit: EventData | null;
  isRefreshing: boolean;
}


export default class CalenderAgenda extends React.PureComponent<Props, AgendaState> {
  state: AgendaState = {
    items: {},
    selectedDate: '',
    isModalVisible: false,
    eventName: '',
    eventDescription: '',
    eventStartTime: '',
    eventEndTime: '',
    eventToEdit: null,
    isRefreshing: false,
  };

  componentDidMount() {
    this.fetchEvents();
    this.setState({ 
        selectedDate: new Date().toLocaleDateString('en-CA'),
        // items: {[new Date().toLocaleDateString('en-CA')]: []}
    });
  }

  fetchEvents = async () => {
    try {
      const eventsList = await FirestoreService.getEventsFromCollection(
        this.props.rootCollection, 
        this.props.eventDocs,
        this.props.eventCollection
      );
      
      if (eventsList.length === 0) {
        this.setState({ items: {} });
        return;
      }
      
      const formattedEvents: AgendaSchedule = {};
      for (const eventDate of eventsList) {
        const dailyEvents = await FirestoreService.getEventsFromCollection(
          this.props.rootCollection, this.props.eventDocs, this.props.eventCollection, eventDate.id, 'DailyAgenda'
        );
        
        dailyEvents.forEach(event => {
          const startDate = event.StartTime instanceof Timestamp ? event.StartTime.toDate() : new Date(event.StartTime);
          const dateKey = startDate.toLocaleDateString('en-CA');
          
          if (!formattedEvents[dateKey]) formattedEvents[dateKey] = [];
          formattedEvents[dateKey].push({
            ...event,
            day: startDate.toLocaleTimeString(),
            name: event.EventName,
            height: 50, 
          });
        });
      }
      
      this.setState({ items: formattedEvents });
      
      // this.setState({ items: formattedEvents });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  handleDateSelect = async (date: string) => {
    console.log('Selected date!!!!!!!!!:', date);
    this.setState({ selectedDate: date.normalize('NFC') });
    try {
      const eventsList = await FirestoreService.getEventsFromCollection(
        this.props.rootCollection,
        this.props.eventDocs,
        this.props.eventCollection,
        date,
        'DailyAgenda'
      );
      this.setState(prevState => ({
        items: {
          ...prevState.items,
          [date]: eventsList.length === 0 ? [] : eventsList.map(event => ({
            ...event,
            name: event.EventName,
            height: 50, 
            day: event.StartTime && event.StartTime.toDate
              ? new Date(event.StartTime.toDate()).toLocaleTimeString()
              : 'Invalid Time',
          })),
        },
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };


  openEditModal = (event: EventData) => {
    if (!this.state.selectedDate) {
        Alert.alert('Please select a date');
        return;
    }
    this.setState({
      isModalVisible: true,
      eventName: event.EventName,
      eventDescription: event.EventDescription,
      eventStartTime: event.StartTime?.toDate().toLocaleString() || '',
      eventEndTime: event.EndTime?.toDate().toLocaleString() || '',
      eventToEdit: event,
    });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false, eventToEdit: null });
  };

handleSaveEvent = async (
    eventName: string, 
    eventDescription: string, 
    eventStartTime: string, 
    eventEndTime: string
): Promise<void> => {
    const { eventToEdit, selectedDate } = this.state;
    console.log("all input", eventName, eventDescription, eventStartTime, eventEndTime);
    if (!eventName || !eventStartTime || !eventEndTime) {
        Alert.alert('All fields are required');
        return;
    }
    console.log("time", new Date(eventStartTime));
    const newEvent: EventData = {
        id: eventToEdit ? eventToEdit.id : '', // Provide a default id or generate a new one
        EventName: eventName,
        EventDescription: eventDescription,
        StartTime: FirestoreService.createTimestampFromTimeString(eventStartTime, selectedDate),
        EndTime: FirestoreService.createTimestampFromTimeString(eventEndTime, selectedDate),
    };

    const timestamp = FirestoreService.createTimestampFromTimeString(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }), selectedDate);
    // Update lastUpdated field
    await FirestoreService.updateDocField(
      "lastUpdated", 
      timestamp,
        this.props.rootCollection, 
        this.props.eventDocs, 
        this.props.eventCollection, 
        selectedDate, 
    );
    if (eventToEdit) {
        // Update existing event
        await FirestoreService.updateEventInCollection(
            eventToEdit.id, 
            newEvent, 
            this.props.rootCollection, 
            this.props.eventDocs, 
            this.props.eventCollection, 
            selectedDate, 
            'DailyAgenda'
            
        );
    } else {        
        // Add new event
        await FirestoreService.addEventToCollection(
            newEvent, 
            this.props.rootCollection, 
            this.props.eventDocs, 
            this.props.eventCollection, 
            selectedDate, 
            'DailyAgenda'
        );
    }

    this.setState({ isModalVisible: false, eventToEdit: null });
    this.handleDateSelect(selectedDate);
};

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No Plan for Today!</Text>
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  onAddEventPressed = () => {
    if (!this.state.selectedDate) {
        Alert.alert('Please select a date');
        return;
    }
    this.setState({ isModalVisible: true });
  }

  loadItems = (day: DateData) => {
    console.log('loadItems called', day);
    setTimeout(() => {
        this.handleDateSelect(this.state.selectedDate);
    }, 5000);
  };
  deleteEvent = async (event: EventData) => {
    const { selectedDate } = this.state;
    try {
      await FirestoreService.deleteEventFromCollection(
        event.id, 
        this.props.rootCollection, 
        this.props.eventDocs, 
        this.props.eventCollection, 
        selectedDate, 
        'DailyAgenda'
      );
      this.handleDateSelect(selectedDate);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }

  renderItem = (item: EventData) => {
    return (
      <TouchableOpacity onPress={() => Alert.alert(item.EventName, item.EventDescription)}>
        <View style={styles.itemContainer}>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text>{item.EventName}</Text>
            <Text>Start: {item.StartTime?.toDate().toLocaleTimeString()} {item.StartTime?.toDate().toLocaleDateString()}</Text>
            <Text>End:   {item.EndTime?.toDate().toLocaleTimeString()} {item.EndTime?.toDate().toLocaleDateString()}</Text>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <TouchableOpacity 
              style={{ backgroundColor: 'red', padding: 5, borderRadius: 5, margin: 5 }}
              onPress={() => this.deleteEvent(item)}>
              <Text style={{alignSelf: 'center'}}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ backgroundColor: 'skyblue', padding: 5, borderRadius: 5, margin: 5 }}
              onPress={() => this.openEditModal(item)}>
              <Text style={{alignSelf: 'center'}}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  handleRefresh = () => {
    this.setState({ isRefreshing: true });
    // this.fetchEvents();
    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 2000);
  };

  render() {
    const { selectedDate, items, isModalVisible} = this.state;

    // Generate `markedDates` to show dots on the calendar
    const markedDates = Object.keys(items).reduce((acc, date) => {
      if (items[date].length > 0) {
        acc[date] = { marked: true, dotColor: 'blue' };
      }
      return acc;
    }, {} as Record<string, { marked: boolean; dotColor: string }>);

    return (
      <SafeAreaView style={styles.safe}>
        <Agenda
          testID="agenda"
          items={items}
          selected={selectedDate}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.handleRefresh}
            />
          }
          refreshing={this.state.isRefreshing}
          renderItem={this.renderItem}
          loadItemsForMonth={this.loadItems}
          onCalendarToggled={this.loadItems}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          showClosingKnob={true}
          onDayPress={(day: DateData) => this.handleDateSelect(day.dateString)}
          markedDates={markedDates}
          showOnlySelectedDayItems={true}
          renderKnob={() => <View style={{ height: 10, width: 100, backgroundColor: 'skyblue' }} />}
          theme={{
            selectedDayBackgroundColor: 'blue',
            selectedDayTextColor: 'white',
            todayTextColor: 'red',
            arrowColor: 'blue',
          }}
        />
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => this.onAddEventPressed()}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        
        <TimeSelectorModal 
            isModalVisible={isModalVisible} 
            closeModal={this.closeModal} 
            handleSaveEvent={this.handleSaveEvent} 
            event={this.state.eventToEdit} 
            date={this.state.selectedDate}
        />
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    padding: 10,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
