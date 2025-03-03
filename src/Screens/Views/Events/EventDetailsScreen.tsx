// src/Screens/Views/Events/EventDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { EventStackParamList } from '../../../Navigation/EventsNavigator';
import FirestoreService from '../../../Services/FirestoreService';
import styles from './styles';

type EventDetailsRouteProp = RouteProp<EventStackParamList, 'EventDetails'>;

const EventDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<EventDetailsRouteProp>();
  const { eventId } = route.params;

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        // Note: This call builds the path "Events/GlobalEvents/Data/{eventId}"
        const fetchedEvent = await FirestoreService.getEventById('Events', 'GlobalEvents', 'Data', eventId);
        setEvent(fetchedEvent);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [eventId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading event...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Event Image */}
      <Image source={{ uri: event.image }} style={styles.eventImage} />

      {/* Event Title */}
      <Text style={styles.eventTitle}>{event.title}</Text>

      {/* When (Date/Time) */}
      <Text style={styles.eventDetails}>When: {event.when}</Text>

      {/* Location */}
      <Text style={styles.eventDetails}>Location: {event.location}</Text>

      {/* Club */}
      <Text style={styles.eventDetails}>Club: {event.club}</Text>

      {/* Category and Type */}
      <Text style={styles.eventDetails}>Category: {event.category}</Text>
      <Text style={styles.eventDetails}>Type: {event.type}</Text>

      {/* Additional Description / Details */}
      <Text style={styles.eventDescription}>{event.details}</Text>
    </ScrollView>
  );
};

export default EventDetailsScreen;


