// EventModel.ts

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  image: string;
  category: string;
  type: string;
  isMine: boolean; // Indicates if the event is posted by myself
}

export let eventList: Event[] = [
  {
    id: '1',
    title: 'Campus Comedy Night',
    date: '2025-02-16',
    time: '8:00 PM',
    attendees: 45,
    image: 'https://picsum.photos/100/100',
    category: 'Entertainment',
    type: 'Social',
    isMine: false,
  },
  {
    id: '2',
    title: 'AI Research Symposium',
    date: '2025-02-17',
    time: '2:00 PM',
    attendees: 120,
    image: 'https://picsum.photos/100/100',
    category: 'Academic',
    type: 'Conference',
    isMine: true,
  },
];

// Function to add a new event
export const addEvent = (newEvent: Omit<Event, 'id' | 'image' | 'isMine'>) => {
  const event: Event = {
    id: String(new Date().getTime()), // Unique id based on timestamp
    title: newEvent.title,
    date: newEvent.date,
    time: newEvent.time,
    attendees: newEvent.attendees,
    category: newEvent.category,
    type: newEvent.type,
    image: 'https://picsum.photos/100/100', // Default image
    isMine: true,
  };
  eventList.push(event);
};

// NEW: Function to update an existing event
export const updateEvent = (id: string, updatedFields: Omit<Event, 'id' | 'image' | 'isMine'>) => {
  const index = eventList.findIndex(event => event.id === id);
  if (index !== -1) {
    eventList[index] = {
      ...eventList[index],
      ...updatedFields,
    };
  }
};

export const deleteEvent = (id: string) => {
  eventList = eventList.filter(event => event.id !== id);
};
