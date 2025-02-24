import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import EventCard from './EventCard';
import { filterEvents } from '../controllers/EventsController';
import { EventStackParamList } from '../navigation/EventsNavigator';
import SearchBar from '../../SearchBar';
import styles from '../styles';

const EventsListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<EventStackParamList>>();

  // Filter state
  const [selectedDay, setSelectedDay] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const [openDay, setOpenDay] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openType, setOpenType] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown items for filters
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

  const isFocused = useIsFocused();
  // Local state for the events list (using the mutable event list via filterEvents)
  const [events, setEvents] = useState(filterEvents({
    day: selectedDay,
    category: selectedCategory,
    type: selectedType,
  }));

  useEffect(() => {
    setEvents(filterEvents({
      day: selectedDay,
      category: selectedCategory,
      type: selectedType,
    }));
  }, [isFocused, selectedDay, selectedCategory, selectedType]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events Nearby</Text>

      {/* Search Bar */}
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />

      {/* Filter Section */}
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

        {/* Events List wrapped in a flex container */}
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.eventsList}>
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Action Buttons positioned at the bottom */}
        <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('PostEvent')}
            >
              <Text style={styles.buttonText}>POST EVENT</Text>
            </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditEvent')}
          >
            <Text style={styles.buttonText}>EDIT EVENT</Text>
          </TouchableOpacity>
        </View>

    </View>
  );
};

export default EventsListScreen;


