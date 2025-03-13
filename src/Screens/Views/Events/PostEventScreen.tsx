import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';
import { addEvent, convertTo24HourFormat } from '../../../Services/EventService';
import TimeSelector from '../../../Components/Calendars/TimeSelector';
import FirestoreService from '../../../Services/FirestoreService';

// Helper function to fetch clubs
const fetchClubList = async () => {
  try {
    const clubs = await FirestoreService.getDataFromCollection('Clubs');
    return clubs.map(club => ({ label: club.id, value: club.id })); // Assuming 'id' is the club name
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return [];
  }
};

const PostEventScreen = () => {
  const navigation = useNavigation();

  // State for event attributes
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');          // Format: "YYYY-MM-DD"
  // const [startTime, setStartTime] = useState('');  // Format: "HH:MM AM/PM"
  // const [endTime, setEndTime] = useState('');      // Format: "HH:MM AM/PM"
  const [location, setLocation] = useState('');
  const [userId, setUserId] = useState('');
  // Modify state to handle dropdowns (for clubs)
  const [club, setClub] = useState(null);
  const [openClub, setOpenClub] = useState(false);
  const [clubList, setClubList] = useState<{ label: string; value: string }[]>([]);
  // a
  const [details, setDetails] = useState('');
  const [startTime, setStartTime] = useState({ hour: 0, minute: 0 }); // Store as { hour, minute }
  const [endTime, setEndTime] = useState({ hour: 0, minute: 0 }); // Store as { hour, minute }
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);
  
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

  // Fetch the list of clubs when the screen loads
  useEffect(() => {
    const loadClubs = async () => {
      try {
        const clubs = await FirestoreService.getDataFromCollection('Clubs');
        setClubList(clubs.map(club => ({ label: club.id, value: club.id }))); // Assuming 'id' is the club name
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };
    loadClubs();
  }, []);

  // State for Type dropdown
  const [type, setType] = useState('');
  const [openType, setOpenType] = useState(false);
  const typeItems = [
    { label: 'Online', value: 'Online' },
    { label: 'Outdoor', value: 'Outdoor' },
    { label: 'Indoor', value: 'Indoor' },
  ];

  // Format time to HH:MM string
  const formatTime = (time: { hour: number; minute: number }): string => {
    return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
  };

  const handlePostEvent = async () => {
    try {
      // Convert startTime and endTime from AM/PM to 24-hour format strings.
      const startTimeStamp = formatTime(startTime); // e.g. "08:00 AM" -> "08:00"
      const endTimeStamp = formatTime(endTime);       // e.g. "10:00 AM" -> "10:00"

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
      <TimeSelector startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} showStartPicker={showStartPicker} setShowStartPicker={setShowStartPicker} showEndPicker={showEndPicker} setShowEndPicker={setShowEndPicker} />
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
      {/* Club Dropdown instead of text input */}
        <DropDownPicker
          open={openClub}
          value={club}
          items={clubList}
          setOpen={setOpenClub}
          setValue={setClub}
          placeholder="Select a Club"
          style={styles.input}
          listMode="SCROLLVIEW"
          zIndex={4000}
          zIndexInverse={1000}
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





