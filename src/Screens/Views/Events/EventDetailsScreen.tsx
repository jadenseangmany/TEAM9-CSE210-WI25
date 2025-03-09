// src/Screens/Views/Events/EventDetailsScreen.tsx
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { EventStackParamList } from '../../../Navigation/EventsNavigator';
import FirestoreService from '../../../Services/FirestoreService';
import styles from './styles';
import { AddEventToPersonalCalendar } from '../../../Controller/ScheduleController';
import { AppContext } from '../../../Context/AppContext';

type EventDetailsRouteProp = RouteProp<EventStackParamList, 'EventDetails'>;

const EventDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<EventDetailsRouteProp>();
  const { eventId } = route.params;

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAttending, setIsAttending] = useState<boolean>(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        // Build the path "Events/GlobalEvents/Data/{eventId}"
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

  const handleAttendPress = () => {
    setIsAttending(!isAttending);
    try {
      if (isAttending) {
        console.log('Add event to personal calendar');
        // FirestoreService.updateDocField('attendees', event.attendees + 1, 'Events', 'GlobalEvents', 'Data', eventId);
        AddEventToPersonalCalendar(event, user, false);
      } 
      else {
        // FirestoreService.updateDocField('attendees', event.attendees - 1, 'Events', 'GlobalEvents', 'Data', eventId);
        console.log('Removing event from personal calendar');
      }
    }
    catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Event Image */}
      <Image source={{ uri: event.image }} style={styles.eventImage} />

      {/* Event Title */}
      <Text style={styles.eventTitle}>{event.eventName}</Text>

      {/* Date and Time */}
      <Text style={styles.eventDetails}>
        Date: {event.date}{"\n"}
        Start: {new Date(event.startTimeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} | End: {new Date(event.endTimeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
      </Text>

      {/* Location */}
      <Text style={styles.eventDetails}>Location: {event.location}</Text>

      {/* Club */}
      <Text style={styles.eventDetails}>Club: {event.club}</Text>

      {/* Category and Type */}
      <Text style={styles.eventDetails}>Category: {event.category}</Text>
      <Text style={styles.eventDetails}>Type: {event.type}</Text>

      {/* Additional Description */}
      <Text style={styles.eventDescription}>{event.details}</Text>
      <TouchableOpacity style={styles.attendBtn} onPress={() => handleAttendPress()}>
        <Text style={styles.buttonText}>{isAttending? 'Cancel': 'Attend'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EventDetailsScreen;




