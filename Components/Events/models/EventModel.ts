// Defines the structure of an event and exports mock data.
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  image: string;
  category: string;
  type: string;
}

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Campus Comedy Night',
    date: '2025-02-16',
    time: '8:00 PM',
    attendees: 45,
    image: 'https://picsum.photos/100/100',
    category: 'Entertainment',
    type: 'Social'
  },
  {
    id: '2',
    title: 'AI Research Symposium',
    date: '2025-02-17',
    time: '2:00 PM',
    attendees: 120,
    image: 'https://picsum.photos/100/100',
    category: 'Academic',
    type: 'Conference'
  },
  // More events...
];
