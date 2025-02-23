import { Event, MOCK_EVENTS } from '../models/EventModel';


export interface FilterCriteria {
  day: string;
  category: string;
  type: string;
}

// Filtering logic is encapsulated here
export const filterEvents = (filters: FilterCriteria): Event[] => {
  return MOCK_EVENTS.filter(event => {
    const dayMatch = filters.day === 'All' ? true : event.date === filters.day; // Improve date logic as needed
    const categoryMatch = filters.category === 'All' ? true : event.category === filters.category;
    const typeMatch = filters.type === 'All' ? true : event.type === filters.type;
//     const searchMatch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return dayMatch && categoryMatch && typeMatch;
  });
};
