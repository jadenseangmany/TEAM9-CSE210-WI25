import { filterEvents, FilterCriteria } from '../src/Controller/EventsController';
import { eventList, Event } from '../src/Services/EventService';

describe('filterEvents', () => {
  beforeEach(() => {
    // Reset eventList to a known state before each test
    eventList.length = 0;
    eventList.push(
      {
        id: '1',
        title: 'Tech Conference',
        date: '2025-03-01',
        time: '10:00 AM',
        attendees: 200,
        image: 'https://picsum.photos/100/100',
        category: 'Academic',
        type: 'Conference',
        isMine: false,
      },
      {
        id: '2',
        title: 'Music Festival',
        date: '2025-03-02',
        time: '5:00 PM',
        attendees: 500,
        image: 'https://picsum.photos/100/100',
        category: 'Entertainment',
        type: 'Festival',
        isMine: false,
      },
      {
        id: '3',
        title: 'AI Workshop',
        date: '2025-03-01',
        time: '2:00 PM',
        attendees: 50,
        image: 'https://picsum.photos/100/100',
        category: 'Academic',
        type: 'Workshop',
        isMine: true,
      }
    );
  });

  test('filters events by day', () => {
    const filters: FilterCriteria = { day: '2025-03-01', category: 'All', type: 'All', searchQuery: '' };
    const results = filterEvents(filters);
    expect(results).toHaveLength(2);
    expect(results[0].title).toBe('Tech Conference');
    expect(results[1].title).toBe('AI Workshop');
  });

  test('filters events by category', () => {
    const filters: FilterCriteria = { day: 'All', category: 'Academic', type: 'All', searchQuery: '' };
    const results = filterEvents(filters);
    expect(results).toHaveLength(2);
    expect(results.every(event => event.category === 'Academic')).toBe(true);
  });

  test('filters events by type', () => {
    const filters: FilterCriteria = { day: 'All', category: 'All', type: 'Festival', searchQuery: '' };
    const results = filterEvents(filters);
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('Music Festival');
  });

  test('filters events by search query', () => {
    const filters: FilterCriteria = { day: 'All', category: 'All', type: 'All', searchQuery: 'AI' };
    const results = filterEvents(filters);
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('AI Workshop');
  });

  test('filters events with multiple criteria', () => {
    const filters: FilterCriteria = { day: '2025-03-01', category: 'Academic', type: 'Workshop', searchQuery: '' };
    const results = filterEvents(filters);
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('AI Workshop');
  });

  test('returns all events when filters are set to "All" with an empty search query', () => {
    const filters: FilterCriteria = { day: 'All', category: 'All', type: 'All', searchQuery: '' };
    const results = filterEvents(filters);
    expect(results).toHaveLength(eventList.length);
  });

  test('returns no events if no matches found', () => {
    const filters: FilterCriteria = { day: '2025-03-05', category: 'Sports', type: 'Game', searchQuery: 'Nonexistent' };
    const results = filterEvents(filters);
    expect(results).toHaveLength(0);
  });
});
