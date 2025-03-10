import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { CalenderEventData } from '../Types/Interfaces';
import TimeSelector from './TimeSelector';

interface TimeSelectorModalProps {
  isModalVisible: boolean;
  closeModal: () => void;
  handleSaveEvent: (eventName: string, eventDescription: string, startTime: string, endTime: string) => void;
  event: CalenderEventData | null;
  date: string; // Date in YYYY-MM-DD format
}

const TimeSelectorModal: React.FC<TimeSelectorModalProps> = ({ isModalVisible, closeModal, handleSaveEvent, event, date }) => {
  const [eventName, setEventName] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [startTime, setStartTime] = useState({ hour: 0, minute: 0 }); // Store as { hour, minute }
  const [endTime, setEndTime] = useState({ hour: 0, minute: 0 }); // Store as { hour, minute }
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  // Initialize with event data or default to 00:00
  useEffect(() => {
    if (event) {
      setEventName(event.EventName);
      setEventDescription(event.EventDescription);
      // Assuming event.StartTime and EndTime are Date-like or ISO strings
      const start = event.StartTime.toDate(); // Convert Timestamp to Date
      const end = event.EndTime.toDate();
      console.log(start.getHours(), event.StartTime);
      setStartTime({ hour: start.getHours(), minute: start.getMinutes() });
      setEndTime({ hour: end.getHours(), minute: end.getMinutes() });
    } else {
      setEventName('');
      setEventDescription('');
      setStartTime({ hour: 0, minute: 0 });
      setEndTime({ hour: 0, minute: 0 });
    }
  }, [event, date]);

  // Format time to HH:MM string
  const formatTime = (time: { hour: number; minute: number }): string => {
    return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
  };

  // Handle save
  const onSaveCallback = () => {
    handleSaveEvent(eventName, eventDescription, formatTime(startTime), formatTime(endTime));
    setEventName('');
    setEventDescription('');
    setStartTime({ hour: 0, minute: 0 });
    setEndTime({ hour: 0, minute: 0 });
    closeModal();
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

        <TimeSelector startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} showStartPicker={showStartPicker} setShowStartPicker={setShowStartPicker} showEndPicker={showEndPicker} setShowEndPicker={setShowEndPicker} />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={onSaveCallback} />
          <Button title="Cancel" onPress={closeModal} />
        </View>
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
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default TimeSelectorModal;