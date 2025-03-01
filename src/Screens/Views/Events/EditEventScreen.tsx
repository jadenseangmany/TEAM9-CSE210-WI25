// src/Screens/Views/Events/EditEventScreen.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { EventStackParamList } from '../../../Navigation/EventsNavigator';
import { eventList } from '../../../Services/EventService';
import EventCard from './EventCard';
import styles from './styles';

const EditEventScreen = () => {
  const navigation = useNavigation<NavigationProp<EventStackParamList>>();

  // Define a mock local user id
  const localUserId = 'localUser123';

  // Filter events where the event's userId matches the local user id
  const myEvents = eventList.filter(event => event.userId === localUserId);

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
