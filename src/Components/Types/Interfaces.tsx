export interface Event {
  id: string;            // auto-assigned by the db
  eventName: string;     // renamed from "title" for calendar module compatibility
  date: string;          // Format: "YYYY-MM-DD"
  startTimeStamp: number; // Numeric timestamp (e.g. milliseconds since epoch) for the start time
  endTimeStamp: number;   // Numeric timestamp for the end time
  location: string;
  userId: string;
  club: string;
  category: string;
  type: string;          // e.g., "online", "outdoor", or "indoor"
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
