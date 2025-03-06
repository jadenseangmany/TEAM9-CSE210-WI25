import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';
import { addEvent } from '../../../Services/EventService';

const PostEventScreen = () => {
  const navigation = useNavigation();

  // State for event attributes
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');          // Format: "YYYY-MM-DD"
  const [startTime, setStartTime] = useState('');  // Format: "XX:XX AM/PM"
  const [endTime, setEndTime] = useState('');      // Format: "XX:XX AM/PM"
  const [location, setLocation] = useState('');
  const [userId, setUserId] = useState('');
  const [club, setClub] = useState('');
  const [details, setDetails] = useState('');

  // State for Category dropdown
  const [category, setCategory] = useState('');
  const [openCategory, setOpenCategory] = useState(false);
  const categoryItems = [
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Academic', value: 'Academic' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Social', value: 'Social' },
    { label: 'Conference', value: 'Conference' },
    { label: 'Workshop', value: 'Workshop' },
  ];

  // State for Type dropdown
  const [type, setType] = useState('');
  const [openType, setOpenType] = useState(false);
  const typeItems = [
    { label: 'Online', value: 'Online' },
    { label: 'Outdoor', value: 'Outdoor' },
    { label: 'Indoor', value: 'Indoor' },
  ];

  const handlePostEvent = async () => {
    try {
      await addEvent({
        title,
        date,
        startTime,
        endTime,
        location,
        userId,
        club,
        category,
        type,
        details,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error posting event:', error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled={true}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Text style={styles.title}>Post Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time (e.g., 08:00 AM)"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time (e.g., 10:00 AM)"
        value={endTime}
        onChangeText={setEndTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Club"
        value={club}
        onChangeText={setClub}
      />

      {/* Category Dropdown */}
      <DropDownPicker
        open={openCategory}
        value={category}
        items={categoryItems}
        setOpen={setOpenCategory}
        setValue={setCategory}
        placeholder="Select Category"
        style={styles.input}
        listMode="SCROLLVIEW"  // Use SCROLLVIEW mode instead of VirtualizedList
        zIndex={3000}
        zIndexInverse={1000}
      />

      {/* Type Dropdown */}
      <DropDownPicker
        open={openType}
        value={type}
        items={typeItems}
        setOpen={setOpenType}
        setValue={setType}
        placeholder="Select Type"
        style={styles.input}
        listMode="SCROLLVIEW"
        zIndex={2000}
        zIndexInverse={1100}
      />

      <TextInput
        style={styles.input}
        placeholder="Details"
        value={details}
        onChangeText={setDetails}
      />
      <TouchableOpacity style={styles.button} onPress={handlePostEvent}>
        <Text style={styles.buttonText}>Submit Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostEventScreen;




