import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Types
type EventStackParamList = {
  EventsList: undefined;
  EventDetails: { eventId: string };
};

const Stack = createStackNavigator<EventStackParamList>();

// Mock Data
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Campus Comedy Night',
    date: '2025-02-16',
    time: '8:00 PM',
    attendees: 45,
    image: 'https://picsum.photos/100/100', // placeholder image
    category: 'Entertainment',
    type: 'Social'
  },
  {
    id: '2',
    title: 'AI Research Symposium',
    date: '2025-02-17',
    time: '2:00 PM',
    attendees: 120,
    image: 'https://picsum.photos/100/100',
    category: 'Academic',
    type: 'Conference'
  },
  // Add more mock events as needed
];

// Filter Button Component
const FilterButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.filterButton} onPress={onPress}>
    <Text style={styles.filterButtonText}>{title}</Text>
    <Ionicons name="chevron-down" size={16} color="#666" />
  </TouchableOpacity>
);

// Event Card Component
const EventCard = ({ event, onPress }: { event: typeof MOCK_EVENTS[0]; onPress: () => void }) => (
  <TouchableOpacity style={styles.eventCard} onPress={onPress}>
    <Image source={{ uri: event.image }} style={styles.eventImage} />
    <View style={styles.eventInfo}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventDateTime}>{event.date} at {event.time}</Text>
      <Text style={styles.eventAttendees}>{event.attendees} attending</Text>
    </View>
  </TouchableOpacity>
);

// Events List Screen
const EventsListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<EventStackParamList>>();
  const [selectedDay, setSelectedDay] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events Nearby</Text>
      
      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <FilterButton title={`Day: ${selectedDay}`} onPress={() => {/* Implement filter logic */}} />
        <FilterButton title={`Category: ${selectedCategory}`} onPress={() => {/* Implement filter logic */}} />
        <FilterButton title={`Type: ${selectedType}`} onPress={() => {/* Implement filter logic */}} />
      </ScrollView>

      {/* Events List */}
      <ScrollView style={styles.eventsList}>
        {MOCK_EVENTS.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
          />
        ))}
      </ScrollView>
    </View>
  );
};

// Event Details Screen
const EventDetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Pressable>
      <Text style={styles.detailsTitle}>Event Details</Text>
    </View>
  );
};

// Main Events Navigator Component
export const EventsScreen = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="EventsList" 
      component={EventsListScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="EventDetails" 
      component={EventDetailsScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonText: {
    marginRight: 4,
    color: '#666',
  },
  eventsList: {
    flex: 1,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  eventInfo: {
    marginLeft: 12,
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventDateTime: {
    color: '#666',
    marginBottom: 4,
  },
  eventAttendees: {
    color: '#666',
    fontSize: 12,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
});