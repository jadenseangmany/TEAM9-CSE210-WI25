// PostEventScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addEvent } from '../models/EventModel';
import styles from '../styles';

const PostEventScreen = () => {
  const navigation = useNavigation();

  // State for input fields
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [attendees, setAttendees] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const handlePostEvent = () => {
    // Convert attendees to a number
    const numAttendees = parseInt(attendees, 10) || 0;

    // Add the new event to the event list
    addEvent({
      title,
      date,
      time,
      attendees: numAttendees,
      category,
      type,
    });

    // Navigate back to the EventsList screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Event</Text>

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

      <TouchableOpacity style={styles.button} onPress={handlePostEvent}>
        <Text style={styles.buttonText}>Submit Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostEventScreen;
