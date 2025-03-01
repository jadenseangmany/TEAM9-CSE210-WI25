export interface Event {
  id: string;          // auto-assigned by the db
  title: string;
  when: string;        // date/time as an ISO string (e.g., "2025-02-16T20:00:00")
  location: string;
  userId: string;
  club: string;
  category: string;
  type: string;        // e.g., "online", "outdoor", or "indoor"
  image: string;
  details: string;
}

export interface CalendarModuleProps {
    schedules: {
      [key: string]: {
        selected: boolean;
        events?: { endTimeStamp: number; startTimeStamp: number; eventName: string }[];
      };
    };
    selectedDate: { [key: string]: { selected: boolean; date: string } };
    onDateSelect: (date: string) => void;
    onEventSave: (date: string, eventName: string, startTimestamp: number, endTimestamp: number) => void;
  }