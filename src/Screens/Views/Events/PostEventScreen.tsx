import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { addEvent } from '../../../Services/EventService';

const PostEventScreen = () => {
  const navigation = useNavigation();

  // New state variables for event attributes
  const [title, setTitle] = useState('');
  const [when, setWhen] = useState('');
  const [location, setLocation] = useState('');
  const [userId, setUserId] = useState('');
  const [club, setClub] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');

  const handlePostEvent = async () => {
    try {
      await addEvent({ title, when, location, userId, club, category, type, details });
      navigation.goBack();
    } catch (error) {
      console.error('Error posting event:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Event</Text>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="When (YYYY-MM-DDTHH:MM:SS)" value={when} onChangeText={setWhen} />
      <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="User ID" value={userId} onChangeText={setUserId} />
      <TextInput style={styles.input} placeholder="Club" value={club} onChangeText={setClub} />
      <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
      <TextInput style={styles.input} placeholder="Type (online/outdoor/indoor)" value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Details" value={details} onChangeText={setDetails} />
      <TouchableOpacity style={styles.button} onPress={handlePostEvent}>
        <Text style={styles.buttonText}>Submit Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostEventScreen;


