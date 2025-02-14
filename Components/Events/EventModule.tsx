// EventModule.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './EventModuleStyles'; // Adjust import path if needed

const STORAGE_KEY = 'MY_EVENTS'; // Key used to store events in AsyncStorage

// Define the Event interface (for TypeScript)
interface Event {
  id: string;       // Unique ID for each event
  name: string;
  location: string;
  details: string;
  createdAt: number;
}

const EventModule = () => {
  // State to control modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // States for form fields
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');

  // State to hold all events (retrieved from AsyncStorage)
  const [events, setEvents] = useState<Event[]>([]);

  // New state: if set, we're editing an existing event. Otherwise, null means creating a new event.
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Load events from local storage when the component mounts
  useEffect(() => {
    loadEventsFromStorage();
  }, []);

  // Async function to load stored events from AsyncStorage
  const loadEventsFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedEvents = JSON.parse(storedData) as Event[];
        setEvents(parsedEvents);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  // Function to handle posting (saving) an event (either new or updated)
  const handlePostEvent = async () => {
    if (editingEvent) {
      // If editing, update the existing event in the list
      const updatedEvents = events.map(event =>
        event.id === editingEvent.id
          ? { ...event, name: eventName, location: location, details: details }
          : event
      );
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
        setEvents(updatedEvents);
      } catch (error) {
        console.error('Error updating event:', error);
      }
    } else {
      // Otherwise, create a new event
      const newEvent: Event = {
        // Generate a simple random ID (use something more robust like UUID in production)
        id: Math.random().toString(36).substr(2, 9),
        name: eventName,
        location: location,
        details: details,
        createdAt: Date.now(),
      };
      const updatedEvents = [...events, newEvent];
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
        setEvents(updatedEvents);
      } catch (error) {
        console.error('Error saving event:', error);
      }
    }
    // Clear form fields and close modal
    setEventName('');
    setLocation('');
    setDetails('');
    setEditingEvent(null);
    setModalVisible(false);
  };

  // Function to handle canceling the modal (reset fields and editing state)
  const handleCancel = () => {
    setEventName('');
    setLocation('');
    setDetails('');
    setEditingEvent(null);
    setModalVisible(false);
  };

  // Function to handle clicking on an event from the list to edit it
  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);             // Mark this event as being edited
    setEventName(event.name);           // Pre-populate the form with the event's details
    setLocation(event.location);
    setDetails(event.details);
    setModalVisible(true);              // Open the modal
  };

  // Function to handle deletion of an event
  const handleDeleteEvent = async (eventId: string) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Function to render each event item in the FlatList
  const renderEventItem = ({ item }: { item: Event }) => {
    return (
      <TouchableOpacity style={styles.eventItem} onPress={() => handleEditEvent(item)}>
        <Text style={styles.eventItemTitle}>Name: {item.name}</Text>
        <Text style={styles.eventItemLocation}>Location: {item.location}</Text>
        <Text style={styles.eventItemDetails}>Details: {item.details}</Text>
        {/* Delete button positioned within the event item */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteEvent(item.id)}
        >
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Module</Text>

      {/* Display list of saved events */}
      <View style={styles.eventListContainer}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={renderEventItem}
          ListEmptyComponent={<Text>No events yet. Post one!</Text>}
        />
      </View>

      {/* "POST" button pinned to the bottom */}
      <View style={styles.postButtonContainer}>
        <Button
          title="POST"
          onPress={() => {
            setEditingEvent(null); // Ensure no event is being edited (new event)
            setModalVisible(true);
          }}
        />
      </View>

      {/* Modal popup for creating or editing an event */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal title changes based on whether we are editing or creating */}
            <Text style={styles.modalTitle}>
              {editingEvent ? 'Edit Event' : 'Create a new event'}
            </Text>

            {/* Input field for Event Name */}
            <TextInput
              style={styles.input}
              placeholder="Event name"
              value={eventName}
              onChangeText={setEventName}
            />

            {/* Input field for Location */}
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />

            {/* Input field for Details */}
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Details"
              multiline
              numberOfLines={4}
              value={details}
              onChangeText={setDetails}
            />

            {/* Row of buttons: "Post event" to save and "Cancel" to dismiss */}
            <View style={styles.modalButtonRow}>
              <View style={styles.buttonWrapper}>
                <Button title="Post event" onPress={handlePostEvent} />
              </View>
              <View style={styles.buttonWrapper}>
                <Button title="Cancel" color="#888" onPress={handleCancel} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EventModule;



