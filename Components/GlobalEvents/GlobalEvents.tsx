import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import FirestoreService from '../Firestore/FirestoreService';
import { EventData } from '../Types/Interfaces';
import { Timestamp } from 'firebase/firestore';
import CalendarModule from '../Calenders/CalenderModule';

const GlobalEvents: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [schedules, setSchedules] = useState<{
    [key: string]: {
      selected: boolean;
      events?: { endTimeStamp: number; startTimeStamp: number; eventName: string }[];
    };
  }>({});
  const [selectedDate, setSelectedDate] = useState<{ [key: string]: { selected: boolean; date: string } }>({});

  const handleDateSelect = (date: string) => {
    setSelectedDate({ [date]: { selected: true, date } });
  };

  const handleEventSave = (date: string, eventName: string, startTimestamp: number, endTimestamp: number) => {
    setSchedules((prevSchedules) => ({
      ...prevSchedules,
      [date]: {
        selected: true,
        events: [
          ...(prevSchedules[date]?.events || []), // Ensure existing events are included
          { eventName, startTimeStamp: startTimestamp, endTimeStamp: endTimestamp },
        ],
      },
    }));
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await FirestoreService.getEventsFromCollection('Events', 'GlobalEvents', 'Date');
        
        // Convert Firestore Timestamps to a readable date format
        const formattedEvents = result.map((event: EventData) => ({
          ...event,
          StartTime: event.StartTime instanceof Timestamp ? event.StartTime.toDate().toLocaleString() : event.StartTime,
          EndTime: event.EndTime instanceof Timestamp ? event.EndTime.toDate().toLocaleString() : event.EndTime,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <CalendarModule
          schedules={schedules}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onEventSave={handleEventSave}
        />
      </View>

      {/* Optional: Add FlatList to display events, if needed */}
      {/* {events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{item.EventName}</Text>
              <Text>{item.EventDescription}</Text>
              <Text>{item.Time}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No events found</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GlobalEvents;
