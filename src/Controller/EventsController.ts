// EventsController.ts
import { Event, eventList } from '../Components/EventModel';

export interface FilterCriteria {
  day: string;
  category: string;
  type: string;
  searchQuery: string;
}

export const filterEvents = (filters: FilterCriteria): Event[] => {
  return eventList.filter(event => {
    const dayMatch = filters.day === 'All' ? true : event.date === filters.day; // Implement proper date filtering as needed
    const categoryMatch = filters.category === 'All' ? true : event.category === filters.category;
    const typeMatch = filters.type === 'All' ? true : event.type === filters.type;
    const searchMatch = event.title.toLowerCase().includes(filters.searchQuery.toLowerCase()); // Use searchQuery for filtering
    return dayMatch && categoryMatch && typeMatch && searchMatch;
  });
};