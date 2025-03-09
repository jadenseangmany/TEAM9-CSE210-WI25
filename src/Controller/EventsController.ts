// EventsController.ts
import { Event } from '../Components/Types/Interfaces';

export interface FilterCriteria {
  day: string;
  category: string;
  type: string;
  searchQuery: string;
}

export const filterEvents = (eventList: Event[], filters: FilterCriteria): Event[] => {
  return eventList.filter((event: Event): boolean => {
    const dayMatch: boolean = filters.day === 'All' ? true : event.date === filters.day; // Implement proper date filtering as needed
    const categoryMatch: boolean = filters.category === 'All' ? true : event.category === filters.category;
    const typeMatch: boolean = filters.type === 'All' ? true : event.type === filters.type;
    const searchMatch: boolean = event.eventName.toLowerCase().includes(filters.searchQuery.toLowerCase()); // Use searchQuery for filtering
    return dayMatch && categoryMatch && typeMatch && searchMatch;
  });
};
