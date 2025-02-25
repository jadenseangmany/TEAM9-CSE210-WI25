// EventsController.ts
import { Event, eventList } from '../models/EventModel';

export interface FilterCriteria {
  day: string;
  category: string;
  type: string;
}

export const filterEvents = (filters: FilterCriteria): Event[] => {
  return eventList.filter(event => {
    const dayMatch = filters.day === 'All' ? true : event.date === filters.day; // Implement proper date filtering as needed
    const categoryMatch = filters.category === 'All' ? true : event.category === filters.category;
    const typeMatch = filters.type === 'All' ? true : event.type === filters.type;
    return dayMatch && categoryMatch && typeMatch;
  });
};