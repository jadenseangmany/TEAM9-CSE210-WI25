import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
// Import the Event interface from its new location
import { Event } from '../../../Components/Types/Interfaces';
import styles from './styles';
import { ClubInfoTag } from '../Clubs/ClubInfoScreen'
interface EventCardProps {
  event: Event;
  onPress: () => void;
}

// Helper function to check if event is a club event
const isClubEvent = (event: Event): boolean => {
  return event?.club && event.club.trim().length > 0;
};

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => (
  <TouchableOpacity style={styles.eventCard} onPress={onPress}>
    <Image source={{ uri: event.image }} style={styles.eventImage} />
    <View style={styles.eventInfo}>
      <Text style={styles.eventTitle}>{event.eventName}</Text>
      <Text style={styles.eventDateTime}>
        Date: {event.date}{"\n"}
        Start: {event.startTimeStamp} | End: {event.endTimeStamp}
      </Text>
      <Text style={styles.eventLocation}>Location: {event.location}</Text>

      {/* Display ClubInfoTag if this event is a club event */}
            {isClubEvent(event) && (
              <View style={styles.clubInfoContainer}>
                <Text style={styles.clubLabel}>Hosted by:</Text>
                <ClubInfoTag clubName={event.club} />
              </View>
            )}

    </View>
  </TouchableOpacity>
);

export default EventCard;



