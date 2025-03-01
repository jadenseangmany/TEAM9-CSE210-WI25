import { Event } from '../Components/Types/Interfaces';

export let eventList: Event[] = [
  {
    id: '1',
    title: 'Campus Comedy Night',
    when: '2025-02-16T20:00:00',
    location: 'Main Campus Theater',
    userId: 'user1',
    club: 'Comedy Club',
    category: 'Entertainment',
    type: 'indoor',
    image: 'https://picsum.photos/100/100',
    details: 'Enjoy a night of laughs and performances!',
  },
  {
    id: '2',
    title: 'AI Research Symposium',
    when: '2025-02-17T14:00:00',
    location: 'Engineering Building',
    userId: 'user2',
    club: 'Tech Club',
    category: 'Academic',
    type: 'indoor',
    image: 'https://picsum.photos/100/100',
    details: 'Join researchers discussing the future of AI.',
  },
];

export const addEvent = (newEvent: Omit<Event, 'id' | 'image'>): void => {
  const event: Event = {
    id: String(new Date().getTime()), // Simple unique id based on timestamp
    title: newEvent.title,
    when: newEvent.when,
    location: newEvent.location,
    userId: newEvent.userId,
    club: newEvent.club,
    category: newEvent.category,
    type: newEvent.type,
    image: 'https://picsum.photos/100/100', // Default image
    details: newEvent.details,
  };
  eventList.push(event);
};

export const updateEvent = (id: string, updatedFields: Omit<Event, 'id' | 'image'>): void => {
  const index = eventList.findIndex(event => event.id === id);
  if (index !== -1) {
    eventList[index] = { ...eventList[index], ...updatedFields };
  }
};

export const deleteEvent = (id: string): void => {
  eventList = eventList.filter(event => event.id !== id);
};

