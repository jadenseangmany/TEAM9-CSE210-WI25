import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalenderModule: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  type dateType = {
    dateString: string;
    day: number;
    month: number;
    timestamp: number;
    year: number;
  };

  const [schedules, setSchedules] = useState<{
    [key: string]: {
      selected: boolean;
      events?: { endTimeStamp: number; startTimeStamp: number; eventName: string }[];
    };
  }>({});
  
  // const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<{ [key: string]: { selected: boolean, date: string} }>({});

  const [eventName, setEventName] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const currentDate = new Date();

  // onSelecting a day callback
  const handleDayPress = (date: dateType) => {
    setSelectedDate({
      [date.dateString]: { selected: true , date: date.dateString},
    });
  };

  // on Saving an event callback
  const handleSaveEvent = () => {
    if (selectedDate && eventName && startTime && endTime) {

      // Convert start and end time to timestamps
      const startTimestamp = new Date(`${Object.keys(selectedDate)[0]}T${startTime}:00`).getTime();
      const endTimestamp = new Date(`${Object.keys(selectedDate)[0]}T${endTime}:00`).getTime();
      console.log(startTimestamp, endTimestamp);
      // Update state correctly using the previous state
      setSchedules((prevDates) => {
        const existingEvents = prevDates[Object.keys(selectedDate)[0]]?.events || []; // Get existing events or an empty array

        return {
          ...prevDates,
          [Object.keys(selectedDate)[0]]: {
            selected: true,
            events: [
              ...existingEvents, // Preserve previous events
              {
                startTimeStamp: startTimestamp,
                endTimeStamp: endTimestamp,
                eventName,
              },
            ],
          },
        };
      });
      setIsModalVisible(false); // Hide the modal after saving
      setEventName('');
      setStartTime('');
      setEndTime('');
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={{ borderRadius: 8 }}
        current={currentDate.toLocaleDateString().replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')}
        markingType={'custom'}
        markedDates={selectedDate}
        onDayPress={handleDayPress}
        theme={{
          backgroundColor: '#526D82',
          calendarBackground: '#526D82',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#DDE6ED',
          textDisabledColor: 'gray',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'skyblue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />

    {/* Display events of selected date*/}
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Events</Text>
      {Object.keys(schedules).map((date) => {
        if (date != Object.keys(selectedDate)[0]) return null;
        const { selected, events } = schedules[date];

        if (events?.length) {
          return (
            <View key={date} style={{ marginVertical: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{date}</Text>
              {events.map((event, index) => (
                <Text key={index}>
                  {event.eventName}: {new Date(event.startTimeStamp).getHours()}:00 - {new Date(event.endTimeStamp).getHours()}:00
                </Text>
              ))}
            </View>
          );
        }
        return null;
      })}
    </View>

    {/* Add Event Button */}
    <View style={{ padding: 20 }}>
      <Button title="Add Event" onPress={() => setIsModalVisible(true)} />
    </View>

      {/* Add Event Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
            />
            <TextInput
              style={styles.input}
              placeholder="Start Time (HH:MM)"
              value={startTime}
              onChangeText={setStartTime}
            />
            <TextInput
              style={styles.input}
              placeholder="End Time (HH:MM)"
              value={endTime}
              onChangeText={setEndTime}
            />
            <Button title="Save Event" onPress={handleSaveEvent} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CalenderModule;