// src/Screens/Views/Events/EditEventDetailScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { EventStackParamList } from '../../../Navigation/EventsNavigator';
import { eventList, updateEvent, deleteEvent } from '../../../Services/EventService';
import styles from './styles';

const EditEventDetailScreen = () => {
  const navigation = useNavigation<NavigationProp<EventStackParamList>>();
  const route = useRoute<RouteProp<EventStackParamList, 'EditEventDetail'>>();
  const { eventId } = route.params;

  // Find the event to edit
  const event = eventList.find(e => e.id === eventId);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found.</Text>
      </View>
    );
  }

  // Pre-populated state for editing, based on the new event structure
  const [title, setTitle] = useState(event.title);
  const [when, setWhen] = useState(event.when);
  const [location, setLocation] = useState(event.location);
  const [userId, setUserId] = useState(event.userId);
  const [club, setClub] = useState(event.club);
  const [category, setCategory] = useState(event.category);
  const [type, setType] = useState(event.type);
  const [details, setDetails] = useState(event.details);

  const handleUpdateEvent = () => {
    updateEvent(eventId, {
      title,
      when,
      location,
      userId,
      club,
      category,
      type,
      details,
    });
    // Navigate back to the main event list screen after updating
    navigation.navigate('EventsList');
  };

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
        placeholder="When (YYYY-MM-DDTHH:MM:SS)"
        value={when}
        onChangeText={setWhen}
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
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Type (online/outdoor/indoor)"
        value={type}
        onChangeText={setType}
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
    </View>
  );
};

export default EditEventDetailScreen;

