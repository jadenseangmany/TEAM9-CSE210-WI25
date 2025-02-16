import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider'; // Make sure to import correctly
import { EventData } from '../Types/Interfaces';

interface TimeSelectorModalProps {
  isModalVisible: boolean;
  closeModal: () => void;
  handleSaveEvent: (eventName: string, eventDescription: string, startTime: string, endTime: string) => void;
  event: EventData | null;
}

const TimeSelectorModal: React.FC<TimeSelectorModalProps> = ({ isModalVisible, closeModal, handleSaveEvent, event }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [startTime, setStartTime] = useState('00:00'); // Start time as HH:MM string
  const [endTime, setEndTime] = useState('00:00'); // End time as HH:MM string

  useEffect(() => {
    if (event) {
        console.log(event.EndTime.toDate().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }));
      setEventName(event.EventName);
      setEventDescription(event.EventDescription);
      setStartTime(event.StartTime.toDate().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })); // Convert to HH:MM format
      setEndTime(event.EndTime.toDate().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })); // Convert to HH:MM format
    }
  }, [event]);

  // Convert minutes to HH:MM format (24-hour format)
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Update the startTime and endTime based on the slider value
  const handleStartTimeChange = (value: number) => {
    const formattedTime = formatTime(value);
    setStartTime(formattedTime);
  };

  const handleEndTimeChange = (value: number) => {
    const formattedTime = formatTime(value);
    setEndTime(formattedTime);
  };

  return (
    <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
      <View style={styles.modalContent}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput
          value={eventName}
          onChangeText={setEventName}
          placeholder="Event Name"
          style={styles.input}
        />
        <Text style={styles.label}>Event Description</Text>
        <TextInput
          value={eventDescription}
          onChangeText={setEventDescription}
          placeholder="Event Description"
          style={styles.input}
        />

        {/* Start Time Slider */}
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
            <Text style={styles.label}>Start Time: </Text>
            <Text style={styles.timeText}>{startTime}</Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={1440} // 24 hours * 60 minutes = 1440 minutes
          step={1}
          value={parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1])} // Convert the HH:MM string to minutes
          onValueChange={handleStartTimeChange}
          style={styles.slider}
        />
        

        {/* End Time Slider */}
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
            <Text style={styles.label}>End Time: </Text>
            <Text style={styles.timeText}>{endTime}</Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={1440} // 24 hours * 60 minutes = 1440 minutes
          step={1}
          value={parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1])} // Convert the HH:MM string to minutes
          onValueChange={handleEndTimeChange}
          style={styles.slider}
        />
        

        {/* Save and Cancel Buttons */}
        <Button title="Save" onPress={() => handleSaveEvent(eventName, eventDescription, startTime, endTime)} />
        <Button title="Cancel" onPress={closeModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  slider: {
    width: '100%',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontFamily: 'monospace',
  },
});

export default TimeSelectorModal;
