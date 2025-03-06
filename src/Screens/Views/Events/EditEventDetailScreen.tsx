// src/Screens/Views/Events/EditEventDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { EventStackParamList } from '../../../Navigation/EventsNavigator';
import FirestoreService from '../../../Services/FirestoreService';
import { updateEvent, deleteEvent } from '../../../Services/EventService';
import styles from './styles';

type EditEventDetailRouteProp = RouteProp<EventStackParamList, 'EditEventDetail'>;

const EditEventDetailScreen = () => {
  const navigation = useNavigation<NavigationProp<EventStackParamList>>();
  const route = useRoute<EditEventDetailRouteProp>();
  const { eventId } = route.params;

  // Local state for event fields (new fields)
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');          // Format: "YYYY-MM-DD"
  const [startTime, setStartTime] = useState('');  // Format: "XX:XX AM/PM"
  const [endTime, setEndTime] = useState('');      // Format: "XX:XX AM/PM"
  const [location, setLocation] = useState('');
  const [userId, setUserId] = useState('');
  const [club, setClub] = useState('');

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

  useEffect(() => {
    const loadEvent = async () => {
      try {
        // Build the path "Events/GlobalEvents/Data/{eventId}"
        const fetchedEvent = await FirestoreService.getEventById('Events', 'GlobalEvents', 'Data', eventId);
        if (fetchedEvent) {
          setTitle(fetchedEvent.title);
          setDate(fetchedEvent.date);
          setStartTime(fetchedEvent.startTime);
          setEndTime(fetchedEvent.endTime);
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
      await updateEvent(eventId, {
        title,
        date,
        startTime,
        endTime,
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
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time (e.g., 08:00 AM)"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time (e.g., 10:00 AM)"
        value={endTime}
        onChangeText={setEndTime}
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



