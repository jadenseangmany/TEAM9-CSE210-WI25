import { createContext } from 'react';
import { AgendaSchedule } from 'react-native-calendars';

interface AppContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: any;
    setUser: (value: any) => void;
    globalEvents: AgendaSchedule;
    setGlobalEvents: (value: AgendaSchedule) => void;
    clubList: any;
  }
  
export const AppContext = createContext<AppContextProps>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    globalEvents: {},
    setGlobalEvents: () => {},
    user: null,
    setUser: () => {},
    clubList: null
});