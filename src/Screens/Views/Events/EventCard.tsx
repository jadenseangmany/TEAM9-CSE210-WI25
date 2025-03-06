import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
// Import the Event interface from its new location
import { Event } from '../../../Components/Types/Interfaces';
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
      <Text style={styles.eventDateTime}>
        Date: {event.date}{"\n"}
        Start: {event.startTime} | End: {event.endTime}
      </Text>
      <Text style={styles.eventLocation}>Location: {event.location}</Text>
    </View>
  </TouchableOpacity>
);

export default EventCard;


