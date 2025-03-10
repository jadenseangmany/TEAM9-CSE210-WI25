import { filterEvents, FilterCriteria } from '../src/Controller/EventsController';
import { Event } from '../src/Components/Types/Interfaces';

describe('filterEvents', () => {
  let eventList: Event[] = [];
  beforeEach(() => {
    // Reset eventList to a known state before each test
    eventList.length = 0;
    eventList.push(
      {
        id: '1',
        eventName: 'Tech Conference',
        date: '2025-03-01',
        startTimeStamp: '10:00',
        endTimeStamp: '12:00',
        location: 'Tech Hall A',
        userId: 'user123',
        club: 'Tech Club',
        category: 'Academic',
        type: 'indoor',
        image: 'https://picsum.photos/100/100',
        details: 'A conference about the latest in tech.',
      },
      {
        id: '2',
        eventName: 'Music Festival',
        date: '2025-03-02',
        startTimeStamp: '17:00',
        endTimeStamp: '23:00',
        location: 'Open Grounds',
        userId: 'user456',
        club: 'Music Club',
        category: 'Entertainment',
        type: 'outdoor',
        image: 'https://picsum.photos/100/100',
        details: 'A festival featuring multiple artists.',
      },
      {
        id: '3',
        eventName: 'AI Workshop',
        date: '2025-03-01',
        startTimeStamp: '14:00',
        endTimeStamp: '16:00',
        location: 'Lab 203',
        userId: 'user789',
        club: 'AI Enthusiasts',
        category: 'Academic',
        type: 'indoor',
        image: 'https://picsum.photos/100/100',
        details: 'An interactive workshop on AI models.',
      }
    );
  });

  test('filters events by day', () => {
    const filters: FilterCriteria = { day: '2025-03-03', category: 'All', type: 'All', searchQuery: '' };
    const results = filterEvents(eventList,filters);
    expect(results).toHaveLength(0);
  });

  test('filters events by category', () => {
    const filters: FilterCriteria = { day: 'All', category: 'Academic', type: 'All', searchQuery: '' };
    const results = filterEvents(eventList,filters);
    expect(results).toHaveLength(2);
    expect(results.every(event => event.category === 'Academic')).toBe(true);
  });

  test('filters events by type', () => {
    const filters: FilterCriteria = { day: 'All', category: 'All', type: 'outdoor', searchQuery: '' };
    const results = filterEvents(eventList,filters);
    expect(results).toHaveLength(1);
    expect(results[0].eventName).toBe('Music Festival');
  });

  test('filters events by search query', () => {
    const filters: FilterCriteria = { day: 'All', category: 'All', type: 'All', searchQuery: 'AI' };
    const results = filterEvents(eventList,filters);
    expect(results).toHaveLength(1);
    expect(results[0].eventName).toBe('AI Workshop');
  });

  test('filters events with multiple criteria', () => {
    const filters: FilterCriteria = { day: 'All', category: 'Academic', type: 'indoor', searchQuery: '' };
    const results = filterEvents(eventList,filters);
    expect(results).toHaveLength(2);
    expect(results[0].eventName).toBe('Tech Conference');
  });

  test('returns all events when filters are set to "All" with an empty search query', () => {
    const filters: FilterCriteria = { day: 'All', category: 'All', type: 'All', searchQuery: '' };
    const results = filterEvents(eventList,filters);
    expect(results).toHaveLength(eventList.length);
  });

  test('returns no events if no matches found', () => {
    const filters: FilterCriteria = { day: '2025-03-05', category: 'Sports', type: 'Game', searchQuery: 'Nonexistent' };
    const results = filterEvents(eventList,filters);
    expect(results).toHaveLength(0);
  });
});