import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';
import { addEvent, convertTo24HourFormat } from '../../../Services/EventService';

const PostEventScreen = () => {
  const navigation = useNavigation();

  // State for event attributes
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');          // Format: "YYYY-MM-DD"
  const [startTime, setStartTime] = useState('');  // Format: "HH:MM AM/PM"
  const [endTime, setEndTime] = useState('');      // Format: "HH:MM AM/PM"
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
      // Convert startTime and endTime from AM/PM to 24-hour format strings.
      const start24 = convertTo24HourFormat(startTime); // e.g. "08:00 AM" -> "08:00"
      const end24 = convertTo24HourFormat(endTime);       // e.g. "10:00 AM" -> "10:00"

      // Build ISO date-time strings
      const startDateTimeString = `${date}T${start24}:00`; // e.g., "2025-02-16T08:00:00"
      const endDateTimeString = `${date}T${end24}:00`;       // e.g., "2025-02-16T10:00:00"

      // Convert to numeric timestamps
      const startTimeStamp = new Date(startDateTimeString).getTime();
      const endTimeStamp = new Date(endDateTimeString).getTime();

      // Call addEvent with the new fields (using eventName instead of title)
      await addEvent({
        eventName: title,
        date,
        startTimeStamp,
        endTimeStamp,
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
        placeholderTextColor={'grey'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        placeholderTextColor={'grey'}
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time (e.g., 08:00 AM)"
        placeholderTextColor={'grey'}
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time (e.g., 10:00 AM)"
        placeholderTextColor={'grey'}
        value={endTime}
        onChangeText={setEndTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor={'grey'}
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="User ID"
        placeholderTextColor={'grey'}
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Club"
        placeholderTextColor={'grey'}
        value={club}
        onChangeText={setClub}
      />
      <DropDownPicker
        open={openCategory}
        value={category}
        items={categoryItems}
        setOpen={setOpenCategory}
        setValue={setCategory}
        placeholder="Select Category"
        style={styles.input}
        listMode="SCROLLVIEW"
        zIndex={3000}
        zIndexInverse={1000}
      />
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
        placeholderTextColor={'grey'}
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





