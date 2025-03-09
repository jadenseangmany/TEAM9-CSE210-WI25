import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider'; // Make sure to import correctly
import { CalenderEventData } from '../Types/Interfaces';

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

        {/* Start Time */}
        <View style={styles.timeSection}>
          <Text style={styles.label}>Start Time: {formatTime(startTime)}</Text>
          <Button title="Select" onPress={() => setShowStartPicker(true)} />
        </View>
        <TimerPickerModal
          visible={showStartPicker}
          setIsVisible={setShowStartPicker}
          onConfirm={(pickedDuration) => {
            setStartTime({ hour: pickedDuration.hours, minute: pickedDuration.minutes });
            setShowStartPicker(false);
          }}
          initialValue={{ hours: startTime.hour, minutes: startTime.minute }}
          modalTitle="Pick Start Time"
          onCancel={() => setShowStartPicker(false)}
          hourLabel="h"
          minuteLabel="m"
          use12HourPicker={false} // 24-hour format
          closeOnOverlayPress
        />

        {/* End Time */}
        <View style={styles.timeSection}>
          <Text style={styles.label}>End Time: {formatTime(endTime)}</Text>
          <Button title="Select" onPress={() => setShowEndPicker(true)} />
        </View>
        <TimerPickerModal
          visible={showEndPicker}
          setIsVisible={setShowEndPicker}
          onConfirm={(pickedDuration) => {
            setEndTime({ hour: pickedDuration.hours, minute: pickedDuration.minutes });
            setShowEndPicker(false);
          }}
          initialValue={{ hours: endTime.hour, minutes: endTime.minute }}
          modalTitle="Pick End Time"
          onCancel={() => setShowEndPicker(false)}
          hourLabel="h"
          minuteLabel="m"
          use12HourPicker={false} // 24-hour format
          closeOnOverlayPress
        />

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
  timeSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default TimeSelectorModal;