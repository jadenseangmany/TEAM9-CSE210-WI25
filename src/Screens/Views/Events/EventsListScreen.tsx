import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import EventCard from './EventCard';
import SearchBar from '../../../Components/SearchBar';
import styles from './styles';
import { Event } from '../../../Components/Types/Interfaces';
import { fetchEvents } from '../../../Services/EventService';
import { EventStackParamList } from '../../../Navigation/EventsNavigator';
import { filterEvents } from '../../../Controller/EventsController';

const EventsListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<EventStackParamList>>();
  const isFocused = useIsFocused();

  // Local state for events fetched from Firestore
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  // (You can still include your filter states if needed)
  const [selectedDay, setSelectedDay] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [openDay, setOpenDay] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openType, setOpenType] = useState(false);


  // (Dropdown items remain unchanged)
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

  // Fetch events whenever the screen is focused
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        // (Optionally, you can filter the events based on selectedDay, category, type, etc.)
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    loadEvents();
  }, [isFocused]);

  useEffect(() => {
      // Filter events based on selectedDay, selectedCategory, selectedType, and searchQuery
      const filteredEvents = filterEvents(events, {
        day: selectedDay,
        category: selectedCategory,
        type: selectedType,
        searchQuery,
      });
      setFilteredEvents(filteredEvents);
  }
  , [selectedDay, selectedCategory, selectedType, searchQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events Nearby</Text>
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />
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


      <View style={{ flex: 1 }}>
        <ScrollView style={styles.eventsList}>
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PostEvent')}>
          <Text style={styles.buttonText}>POST EVENT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditEvent')}>
          <Text style={styles.buttonText}>EDIT EVENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventsListScreen;


