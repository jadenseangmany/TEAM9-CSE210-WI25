// src/Services/EventService.ts
import FirestoreService from './FirestoreService';
import { Event } from '../Components/Types/Interfaces';

// Fetch all events from Firestore
export const fetchEvents = async (): Promise<Event[]> => {
  // Adjust the collection path as needed (here we assume 'Events/GlobalEvents')
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


