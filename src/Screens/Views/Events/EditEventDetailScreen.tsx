// src/Screens/Views/Events/EditEventDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { EventStackParamList } from '../../../Navigation/EventsNavigator';
import FirestoreService from '../../../Services/FirestoreService';
import { updateEvent, deleteEvent } from '../../../Services/EventService';
import styles from './styles';

type EditEventDetailRouteProp = RouteProp<EventStackParamList, 'EditEventDetail'>;

const EditEventDetailScreen = () => {
  const navigation = useNavigation<NavigationProp<EventStackParamList>>();
  const route = useRoute<EditEventDetailRouteProp>();
  const { eventId } = route.params;

  // Local state for event fields
  const [title, setTitle] = useState('');
  const [when, setWhen] = useState('');
  const [location, setLocation] = useState('');
  const [userId, setUserId] = useState('');
  const [club, setClub] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        // Build the path "Events/GlobalEvents/Data/{eventId}"
        const fetchedEvent = await FirestoreService.getEventById('Events', 'GlobalEvents', 'Data', eventId);
        if (fetchedEvent) {
          setTitle(fetchedEvent.title);
          setWhen(fetchedEvent.when);
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
      await updateEvent(eventId, { title, when, location, userId, club, category, type, details });
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


