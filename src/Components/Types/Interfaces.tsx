export interface Event {
  id: string;          // auto-assigned by the db
  title: string;
  date: string;        // Format: "YYYY-MM-DD"
  startTime: string;   // Format: "XX:XX AM/PM"
  endTime: string;     // Format: "XX:XX AM/PM"
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
