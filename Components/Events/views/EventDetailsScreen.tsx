// EventDetailsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { EventStackParamList } from '../navigation/EventsNavigator';
import { eventList } from '../models/EventModel';
import styles from '../styles';

const EventDetailsScreen = () => {
  const navigation = useNavigation();
  // Extract the eventId parameter from the route
  const route = useRoute<RouteProp<EventStackParamList, 'EventDetails'>>();
  const { eventId } = route.params;

  // Find the event by its ID
  const event = eventList.find(e => e.id === eventId);

  // If no event is found, display an error message
  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
    <TouchableOpacity
      style={[styles.backButton, { right: 16 }]}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={24} color="#000" />
    </TouchableOpacity>

      {/* Event Image */}
      <Image source={{ uri: event.image }} style={styles.eventImage} />

      {/* Event Title */}
      <Text style={styles.eventTitle}>{event.title}</Text>

      {/* Event Date and Time */}
      <Text style={styles.eventDetails}>
        {event.date} at {event.time}
      </Text>

      {/* Attendee Count */}
      <Text style={styles.eventDetails}>{event.attendees} attending</Text>

      {/* Category and Type */}
      <Text style={styles.eventDetails}>Category: {event.category}</Text>
      <Text style={styles.eventDetails}>Type: {event.type}</Text>

      {/* Additional Description */}
      <Text style={styles.eventDescription}>
        Join us for an exciting event: {event.title}. This event promises engaging sessions and networking opportunities. Don't miss out!
      </Text>
    </ScrollView>
  );
};

export default EventDetailsScreen;
