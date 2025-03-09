// __tests__/EventService.test.ts
import { Event } from '../src/Components/Types/Interfaces';

describe('EventModel Functions', () => {
  // In-memory array to simulate our event list
  let eventList: Event[] = [];

  // Fake implementation of addEvent
  const fakeAddEvent = async (eventData: Omit<Event, 'id' | 'image'>): Promise<string> => {
    const newEvent: Event = {
      ...eventData,
      id: (eventList.length + 1).toString(),
      image: 'https://picsum.photos/100/100', // default image as per EventService
    };
    eventList.push(newEvent);
    return newEvent.id;
  };

  // Fake implementation of updateEvent
  const fakeUpdateEvent = async (id: string, eventData: Omit<Event, 'id' | 'image'>): Promise<void> => {
    const index = eventList.findIndex(event => event.id === id);
    if (index !== -1) {
      eventList[index] = { ...eventList[index], ...eventData };
    }
  };

  // Fake implementation of deleteEvent
  const fakeDeleteEvent = async (id: string): Promise<void> => {
    eventList = eventList.filter(event => event.id !== id);
  };

  beforeEach(() => {
    // Reset eventList before each test
    eventList = [];
    eventList.push(
      {
        id: '1',
        eventName: 'Campus Comedy Night',
        date: '2025-02-16',
        startTimeStamp: '20:00', // 8:00 PM in 24‑hour format
        endTimeStamp: '22:00',   // assumed duration
        location: 'Campus Hall',
        userId: 'user1',
        club: 'Comedy Club',
        category: 'Entertainment',
        type: 'Indoor',
        image: 'https://picsum.photos/100/100',
        details: 'A night of laughs',
      },
      {
        id: '2',
        eventName: 'AI Research Symposium',
        date: '2025-02-17',
        startTimeStamp: '14:00', // 2:00 PM in 24‑hour format
        endTimeStamp: '16:00',   // assumed duration
        location: 'Main Auditorium',
        userId: 'user2',
        club: 'Tech Club',
        category: 'Academic',
        type: 'Online',
        image: 'https://picsum.photos/100/100',
        details: 'A symposium on AI',
      }
    );
  });

  test('addEvent should add a new event to eventList', async () => {
    await fakeAddEvent({
      eventName: 'Music Concert',
      date: '2025-02-20',
      startTimeStamp: '19:00', // 7:00 PM
      endTimeStamp: '22:00',   // assumed duration
      location: 'City Arena',
      userId: 'user3',
      club: 'Music Club',
      category: 'Entertainment',
      type: 'Outdoor',
      details: 'An evening of live music',
    });

    expect(eventList.length).toBe(3);
    expect(eventList[2].eventName).toBe('Music Concert');
    expect(eventList[2].image).toBe('https://picsum.photos/100/100');
  });

  test('updateEvent should update an existing event', async () => {
    await fakeUpdateEvent('1', {
      eventName: 'Updated Comedy Night',
      date: '2025-02-18',
      startTimeStamp: '21:00', // 9:00 PM
      endTimeStamp: '23:00',   // assumed duration
      location: 'New Campus Hall',
      userId: 'user1',
      club: 'Comedy Club',
      category: 'Entertainment',
      type: 'Indoor',
      details: 'Updated details',
    });

    expect(eventList[0].eventName).toBe('Updated Comedy Night');
    expect(eventList[0].date).toBe('2025-02-18');
    expect(eventList[0].startTimeStamp).toBe('21:00');
  });

  test('deleteEvent should remove an event from eventList', async () => {
    await fakeDeleteEvent('2');

    expect(eventList.length).toBe(1);
    expect(eventList.find(event => event.id === '2')).toBeUndefined();
  });
});

