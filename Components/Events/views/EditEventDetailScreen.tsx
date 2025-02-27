// EditEventDetailScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { EventStackParamList } from '../navigation/EventsNavigator';
import { eventList, updateEvent, deleteEvent } from '../models/EventModel';
import styles from '../styles';

const EditEventDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<EventStackParamList, 'EditEventDetail'>>();
  const { eventId } = route.params;

  // Find the event to edit
  const event = eventList.find(e => e.id === eventId);

  // Pre-populated state for editing
  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState(event?.date || '');
  const [time, setTime] = useState(event?.time || '');
  const [attendees, setAttendees] = useState(event ? String(event.attendees) : '');
  const [category, setCategory] = useState(event?.category || '');
  const [type, setType] = useState(event?.type || '');

  const handleUpdateEvent = () => {
    const numAttendees = parseInt(attendees, 10) || 0;
    updateEvent(eventId, {
      title,
      date,
      time,
      attendees: numAttendees,
      category,
      type,
    });
    // Navigate back to the main event list screen after updating
    navigation.navigate('EventsList');
  };

  // NEW: Function to delete the event
  const handleDeleteEvent = () => {
    deleteEvent(eventId);
    // Navigate back to the main event list screen after deleting
    navigation.navigate('EventsList');
  };

  return (
    <View style={styles.container}>
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
        placeholder="Time (e.g., 8:00 PM)"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Attendees"
        value={attendees}
        onChangeText={setAttendees}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={type}
        onChangeText={setType}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateEvent}>
        <Text style={styles.buttonText}>Submit Event</Text>
      </TouchableOpacity>

      {/* NEW: Red Delete Event Button */}
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteEvent}>
        <Text style={styles.buttonText}>Delete Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditEventDetailScreen;
