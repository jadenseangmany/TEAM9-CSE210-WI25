import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';

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

  const [openDay, setOpenDay] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openType, setOpenType] = useState(false);

  // Add these items arrays in EventsListScreen component
  const dayItems = [
    { label: 'All', value: 'All' },
    { label: 'Today', value: 'Today' },
    { label: 'Tomorrow', value: 'Tomorrow' },
    { label: 'This Week', value: 'This Week' },
  ];

  const categoryItems = [
    { label: 'All', value: 'All' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Academic', value: 'Academic' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Social', value: 'Social' },
    { label: 'Conference', value: 'Conference' },
    { label: 'Workshop', value: 'Workshop' },
  ];

  const typeItems = [
    { label: 'All', value: 'All' },
    { label: 'Online', value: 'Online' },
    { label: 'Outdoor', value: 'Outdoor' },
    { label: 'Indoor', value: 'Indoor' },
  ];

  // Add this filtering logic before the return statement
  const filteredEvents = MOCK_EVENTS.filter(event => {
    const dayMatch = selectedDay === 'All' ? true : event.date === selectedDay; // You'll need to implement proper date filtering logic
    const categoryMatch = selectedCategory === 'All' ? true : event.category === selectedCategory;
    const typeMatch = selectedType === 'All' ? true : event.type === selectedType;
    return dayMatch && categoryMatch && typeMatch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events Nearby</Text>
      
      {/* Filters */}
      <View style={styles.filtersContainer}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.filterLabel}>Day</Text>
        <DropDownPicker
          open={openDay}
          value={selectedDay}
          items={dayItems}
          setOpen={setOpenDay}
          setValue={setSelectedDay}
          placeholder="Select Day"
          style={styles.dropdown}
          zIndex={3000}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.filterLabel}>Category</Text>
        <DropDownPicker
          open={openCategory}
          value={selectedCategory}
          items={categoryItems}
          setOpen={setOpenCategory}
          setValue={setSelectedCategory}
          placeholder="Category"
          style={styles.dropdown}
          zIndex={2000}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.filterLabel}>Type</Text>
        <DropDownPicker
          open={openType}
          value={selectedType}
          items={typeItems}
          setOpen={setOpenType}
          setValue={setSelectedType}
          placeholder="Type"
          style={styles.dropdown}
          zIndex={1000}
        />
      </View>
    </View>
      

      {/* Events List */}
      <ScrollView style={styles.eventsList}>
        {/* {MOCK_EVENTS.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
          />
        ))} */}
        {filteredEvents.map(event => (
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
  eventsList: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    minHeight: 40,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  selectedValue: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dropdownContainer: {
    flex: 1,
    marginBottom: 8,
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