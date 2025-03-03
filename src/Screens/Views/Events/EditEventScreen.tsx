// src/Screens/Views/Events/EditEventScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { EventStackParamList } from '../../../Navigation/EventsNavigator';
import EventCard from './EventCard';
import styles from './styles';
import { fetchEvents } from '../../../Services/EventService'; // Import asynchronous fetch

const EditEventScreen = () => {
  const navigation = useNavigation<NavigationProp<EventStackParamList>>();
  const localUserId = 'localUser123';

  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyEvents = async () => {
      try {
        const allEvents = await fetchEvents();
        // Filter events for the local user ID
        const filtered = allEvents.filter((event) => event.userId === localUserId);
        setMyEvents(filtered);
      } catch (error) {
        console.error('Error fetching events for editing:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMyEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Events</Text>
      <ScrollView style={styles.eventsList}>
        {myEvents.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => navigation.navigate('EditEventDetail', { eventId: event.id })}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default EditEventScreen;
