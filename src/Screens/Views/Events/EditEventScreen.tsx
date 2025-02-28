// EditEventScreen.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {EventStackParamList} from '../../../Navigation/EventsNavigator';
import { eventList } from '../../../Services/EventService';
import EventCard from './EventCard';
import styles from './styles';

const EditEventScreen = () => {
  const navigation = useNavigation<NavigationProp<EventStackParamList>>();

  // Filter events where isMine is true
  const myEvents = eventList.filter(event => event.isMine);

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
