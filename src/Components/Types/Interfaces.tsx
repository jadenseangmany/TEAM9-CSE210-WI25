export interface Event {
  id: string;            // auto-assigned by the db
  eventName: string;     // renamed from "title" for calendar module compatibility
  date: string;          // Format: "YYYY-MM-DD"
  startTimeStamp: string; // HH:MM
  endTimeStamp: string;   // HH:MM
  location: string;
  userId: string;
  club: string;
  category: string;
  type: string;          // e.g., "online", "outdoor", or "indoor"
  image: string;
  details: string;
}

export interface CalenderEventData {
  id: string;
  EventName: string;
  EventDescription: string;
  StartTime: any; 
  EndTime: any;
  location?: string;
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
