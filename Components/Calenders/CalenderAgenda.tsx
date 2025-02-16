import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Modal, TextInput, Button } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import FirestoreService from '../Firestore/FirestoreService';
import { EventData } from '../Types/Interfaces';
import { Timestamp } from 'firebase/firestore';
import TimeSelectorModal from './TimeSelectorModal';
import { set } from 'date-fns';

interface Props {
  eventDocs: string;  // 'GlobalEvents' or 'PersonalEvents'
  eventCollection: string;    // 'Date' or useremail
}

interface State {
  items: AgendaSchedule;
  selectedDate: string;
  isModalVisible: boolean;
  eventName: string;
  eventDescription: string;
  eventStartTime: string;
  eventEndTime: string;
  eventToEdit: EventData | null;
}

export default class CalenderAgenda extends Component<Props, State> {
  state: State = {
    items: {},
    selectedDate: '',
    isModalVisible: false,
    eventName: '',
    eventDescription: '',
    eventStartTime: '',
    eventEndTime: '',
    eventToEdit: null,
  };

  componentDidMount() {
    this.fetchEvents();
    this.setState({ 
        selectedDate: new Date().toLocaleDateString('en-CA'),
        items: {[new Date().toLocaleDateString('en-CA')]: []}
    });
    // const interval = setInterval(() => {
    //     this.fetchEvents();
    //   }, 10000); // 10 seconds interval
    // return () => clearInterval(interval); // Cleanup function to prevent memory leaks
  }

  fetchEvents = async () => {
    try {
      const eventsList = await FirestoreService.getEventsFromCollection(
        'Events', 
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
          'Events', this.props.eventDocs, this.props.eventCollection, eventDate.id, 'DailyAgenda'
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
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  handleDateSelect = async (date: string) => {
    this.setState({ selectedDate: date });
    try {
      const eventsList = await FirestoreService.getEventsFromCollection(
        'Events',
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

  renderItem = (item: EventData) => (
    console.log("renderItem", item),
    <View style={styles.itemContainer}>
      <Text>{item.EventName}</Text>
      <Text>Start: {item.StartTime?.toDate().toLocaleTimeString()} {item.StartTime?.toDate().toLocaleDateString()}</Text>
      <Text>End: {item.EndTime?.toDate().toLocaleTimeString()} {item.EndTime?.toDate().toLocaleDateString()}</Text>
      <TouchableOpacity onPress={() => this.openEditModal(item)}>
        <Text>Edit</Text>
      </TouchableOpacity>
    </View>
  );

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
        StartTime: FirestoreService.createTimestampFromTimeString(eventStartTime),
        EndTime: FirestoreService.createTimestampFromTimeString(eventEndTime),
    };

    if (eventToEdit) {
        // Update existing event
        await FirestoreService.updateEventInCollection(
            eventToEdit.id, 
            newEvent, 
            'Events', 
            this.props.eventDocs, 
            this.props.eventCollection, 
            selectedDate, 
            'DailyAgenda'
        );
    } else {
        console.log('new event:', newEvent);
        // Add new event
        await FirestoreService.addEventToCollection(
            newEvent, 
            'Events', 
            this.props.eventDocs, 
            this.props.eventCollection, 
            selectedDate, 
            'DailyAgenda'
        );
    }

    this.setState({ isModalVisible: false, eventToEdit: null });
    this.fetchEvents();
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
    setTimeout(() => {
        this.fetchEvents();
    }, 3000);
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
          items={items || {[new Date().toLocaleDateString('en-CA')]: [{ name: 'No Plan Today', height: 50, day: '12:00' } as AgendaEntry]}}
          selected={selectedDate}
          renderItem={this.renderItem}
          loadItemsForMonth={this.loadItems}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          showClosingKnob={true}
          onDayPress={(day: DateData) => this.handleDateSelect(day.dateString)}
          markedDates={markedDates}
          showOnlySelectedDayItems={true}
          renderKnob={() => <View style={{ height: 20, width: 100, backgroundColor: 'skyblue' }} />}
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
        
        <TimeSelectorModal isModalVisible={isModalVisible} closeModal={this.closeModal} handleSaveEvent={this.handleSaveEvent} event={this.state.eventToEdit}/>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
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
