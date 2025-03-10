// EventsController.ts
import { Event } from '../Components/Types/Interfaces';

export interface FilterCriteria {
  day: string;
  category: string;
  type: string;
  searchQuery: string;
}

const dateMatches = (eventDate: string, filterDate: string): boolean => {
  let day = new Date().toLocaleDateString('en-CA');
  console.log("today", new Date());
  if (filterDate === 'Today') {
    return eventDate === day;
  } else if (filterDate === 'Tomorrow') {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day
    const tomorrowStr = tomorrow.toLocaleDateString('en-CA'); // Local YYYY-MM-DD
    return eventDate === tomorrowStr;
  } else if (filterDate === 'This Week') {
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toLocaleDateString();
    return eventDate >= day && eventDate <= nextWeek;
  }
  return false;
};

export const filterEvents = (eventList: Event[], filters: FilterCriteria): Event[] => {
  return eventList.filter((event: Event): boolean => {
    const dayMatch: boolean = filters.day === 'All' ? true : dateMatches(event.date, filters.day);
    const categoryMatch: boolean = filters.category === 'All' ? true : event.category === filters.category;
    const typeMatch: boolean = filters.type === 'All' ? true : event.type === filters.type;
    const searchMatch: boolean = event.eventName.toLowerCase().includes(filters.searchQuery.toLowerCase()); // Use searchQuery for filtering
    return dayMatch && categoryMatch && typeMatch && searchMatch;
  });
};
