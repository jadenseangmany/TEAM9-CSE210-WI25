import FirestoreService from './FirestoreService';
import { Event } from '../Components/Types/Interfaces';

// Fetch all events from Firestore
export const fetchEvents = async (): Promise<Event[]> => {
  // Adjust the collection path as needed (here we assume 'Events/GlobalEvents/Data')
  const events = await FirestoreService.getEventsFromCollection('Events', 'GlobalEvents', 'Data');
  return events;
};

// Add a new event to Firestore
export const addEvent = async (eventData: Omit<Event, 'id' | 'image'>): Promise<string> => {
  // Combine the provided data with a default image
  const eventWithImage: Event = {
    ...eventData,
    image: 'https://picsum.photos/100/100', // Default image
    id: '', // Temporary; will be updated by FirestoreService.addEventToCollection
  };
  const newId = await FirestoreService.addEventToCollection(eventWithImage, 'Events', 'GlobalEvents', 'Data');
  return newId;
};

// Update an existing event in Firestore
export const updateEvent = async (id: string, eventData: Omit<Event, 'id' | 'image'>): Promise<void> => {
  await FirestoreService.updateEventInCollection(id, eventData, 'Events', 'GlobalEvents', 'Data');
};

// Delete an event from Firestore
export const deleteEvent = async (id: string): Promise<void> => {
  await FirestoreService.deleteEventFromCollection(id, 'Events', 'GlobalEvents', 'Data');
};

/**
 * Converts an AM/PM time string (e.g., "08:00 AM") to a 24‑hour format string (e.g., "08:00").
 */
export const convertTo24HourFormat = (timeStr: string): string => {
  // Split the time string into time and modifier parts
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  // Convert hours based on the modifier
  if (modifier.toUpperCase() === 'PM' && hours !== '12') {
    hours = String(parseInt(hours, 10) + 12);
  }
  if (modifier.toUpperCase() === 'AM' && hours === '12') {
    hours = '00';
  }
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

/**
 * Converts a 24‑hour format time string (e.g., "13:45") to an AM/PM time string (e.g., "1:45 PM").
 */
export const convertTo12HourFormat = (timeStr: string): string => {
  let [hours, minutes] = timeStr.split(':');
  let modifier = 'AM';
  let hourNum = parseInt(hours, 10);
  if (hourNum >= 12) {
    modifier = 'PM';
    if (hourNum > 12) {
      hourNum -= 12;
    }
  } else if (hourNum === 0) {
    hourNum = 12;
  }
  return `${hourNum}:${minutes} ${modifier}`;
};


