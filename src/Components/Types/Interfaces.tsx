export interface EventData {
    id: string;
    EventName: string;
    EventDescription: string;
    StartTime: any; 
    EndTime: any;
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