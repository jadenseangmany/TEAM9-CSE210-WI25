import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Event } from '../../../Services/EventService';
import styles from './styles';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => (
  <TouchableOpacity style={styles.eventCard} onPress={onPress}>
    <Image source={{ uri: event.image }} style={styles.eventImage} />
    <View style={styles.eventInfo}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventDateTime}>{event.date} at {event.time}</Text>
      <Text style={styles.eventAttendees}>{event.attendees} attending</Text>
    </View>
  </TouchableOpacity>
);

export default EventCard;
