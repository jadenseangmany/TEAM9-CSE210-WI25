// src/Screens/Views/Events/EditEventDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { EventStackParamList } from '../../../Navigation/EventsNavigator';
import FirestoreService from '../../../Services/FirestoreService';
import { updateEvent, deleteEvent } from '../../../Services/EventService';
import styles from './styles';
import TimeSelector from '../../../Components/Calendars/TimeSelector';

type EditEventDetailRouteProp = RouteProp<EventStackParamList, 'EditEventDetail'>;

const EditEventDetailScreen = () => {
  const navigation = useNavigation<NavigationProp<EventStackParamList>>();
  const route = useRoute<EditEventDetailRouteProp>();
  const { eventId } = route.params;

  // Local state for event fields (using the new interface)
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');          // Format: "YYYY-MM-DD"
  // Use time scroller state as {hour, minute}
  const [startTime, setStartTime] = useState({ hour: 0, minute: 0 });
  const [endTime, setEndTime] = useState({ hour: 0, minute: 0 });
  const [location, setLocation] = useState('');
  const [userId, setUserId] = useState('');
  const [club, setClub] = useState('');
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  // Category dropdown state
  const [category, setCategory] = useState('');
  const [openCategory, setOpenCategory] = useState(false);
  const categoryItems = [
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Academic', value: 'Academic' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Social', value: 'Social' },
    { label: 'Conference', value: 'Conference' },
    { label: 'Workshop', value: 'Workshop' },
  ];

  // Type dropdown state
  const [type, setType] = useState('');
  const [openType, setOpenType] = useState(false);
  const typeItems = [
    { label: 'Online', value: 'Online' },
    { label: 'Outdoor', value: 'Outdoor' },
    { label: 'Indoor', value: 'Indoor' },
  ];

  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(true);

  // Helper: format time to HH:MM string
  const formatTime = (time: { hour: number; minute: number }): string => {
    return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const loadEvent = async () => {
      try {
        // Build the path "Events/GlobalEvents/Data/{eventId}"
        const fetchedEvent = await FirestoreService.getEventById('Events', 'GlobalEvents', 'Data', eventId);
        console.log("fetch event::::::::", fetchedEvent);
        if (fetchedEvent && 'eventName' in fetchedEvent) {
          setEventName(fetchedEvent.eventName);
          setDate(fetchedEvent.date);

          // Convert startTimeStamp to {hour, minute} regardless of it being a number or a string.
          if (fetchedEvent.startTimeStamp !== undefined && fetchedEvent.startTimeStamp !== null) {
            let startTimeStr = '';
            if (typeof fetchedEvent.startTimeStamp === 'number') {
              const d = new Date(fetchedEvent.startTimeStamp);
              const hh = d.getHours().toString().padStart(2, '0');
              const mm = d.getMinutes().toString().padStart(2, '0');
              startTimeStr = `${hh}:${mm}`;
            } else if (typeof fetchedEvent.startTimeStamp === 'string') {
              startTimeStr = fetchedEvent.startTimeStamp;
            }
            const [startHour, startMinute] = startTimeStr.split(':');
            setStartTime({ hour: parseInt(startHour, 10), minute: parseInt(startMinute, 10) });
          }

          // Convert endTimeStamp to {hour, minute} regardless of type.
          if (fetchedEvent.endTimeStamp !== undefined && fetchedEvent.endTimeStamp !== null) {
            let endTimeStr = '';
            if (typeof fetchedEvent.endTimeStamp === 'number') {
              const d = new Date(fetchedEvent.endTimeStamp);
              const hh = d.getHours().toString().padStart(2, '0');
              const mm = d.getMinutes().toString().padStart(2, '0');
              endTimeStr = `${hh}:${mm}`;
            } else if (typeof fetchedEvent.endTimeStamp === 'string') {
              endTimeStr = fetchedEvent.endTimeStamp;
            }
            const [endHour, endMinute] = endTimeStr.split(':');
            setEndTime({ hour: parseInt(endHour, 10), minute: parseInt(endMinute, 10) });
          }

          setLocation(fetchedEvent.location);
          setUserId(fetchedEvent.userId);
          setClub(fetchedEvent.club);
          setCategory(fetchedEvent.category);
          setType(fetchedEvent.type);
          setDetails(fetchedEvent.details);
        } else {
          console.error('Event not found');
        }
      } catch (error) {
        console.error('Error fetching event for editing:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [eventId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading event data...</Text>
      </View>
    );
  }

  const handleUpdateEvent = async () => {
    try {
      // Format the startTime and endTime objects to "HH:MM" strings.
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);
      await updateEvent(eventId, {
        eventName,
        date,
        startTimeStamp: formattedStartTime,
        endTimeStamp: formattedEndTime,
        location,
        userId,
        club,
        category,
        type,
        details
      });
      navigation.navigate('EventsList');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(eventId);
      navigation.navigate('EventsList');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled={true}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Text style={styles.title}>Edit Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TimeSelector
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        showStartPicker={showStartPicker}
        setShowStartPicker={setShowStartPicker}
        showEndPicker={showEndPicker}
        setShowEndPicker={setShowEndPicker}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Club"
        value={club}
        onChangeText={setClub}
      />

      {/* Category Dropdown */}
      <DropDownPicker
        open={openCategory}
        value={category}
        items={categoryItems}
        setOpen={setOpenCategory}
        setValue={setCategory}
        placeholder="Select Category"
        style={styles.input}
        listMode="SCROLLVIEW"
        zIndex={3000}
        zIndexInverse={1000}
      />

      {/* Type Dropdown */}
      <DropDownPicker
        open={openType}
        value={type}
        items={typeItems}
        setOpen={setOpenType}
        setValue={setType}
        placeholder="Select Type"
        style={styles.input}
        listMode="SCROLLVIEW"
        zIndex={2000}
        zIndexInverse={1100}
      />

      <TextInput
        style={styles.input}
        placeholder="Details"
        value={details}
        onChangeText={setDetails}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateEvent}>
        <Text style={styles.buttonText}>Submit Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteEvent}>
        <Text style={styles.buttonText}>Delete Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditEventDetailScreen;







