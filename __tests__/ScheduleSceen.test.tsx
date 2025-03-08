import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ScheduleScreen from '../src/Screens/ScheduleScreen';
import CalenderAgenda from '../src/Components/Calendars/CalenderAgenda';
import { AppContext } from '../src/Context/AppContext';

  // Mock Slider from '@react-native-community/slider'
  jest.mock('@react-native-community/slider', () => 'Slider');
  jest.mock('react-native', () => {
    return {
      StyleSheet: {
        create: () => ({}),
      },
    };
  });
  // Mock { Timestamp } from 'firebase/firestore'
jest.mock('firebase/firestore', () => ({
    Timestamp: {
      fromDate: jest.fn(() => ({ toDate: () => new Date() })),
    },
  }));
jest.mock('../src/Components/Calendars/CalenderAgenda', () => jest.fn(() => null));
  
  describe('ScheduleScreen', () => {
    it('renders correctly with a user', () => {
        const mockUser = { email: 'useremail@ucsd.com' };
      render(
        <AppContext.Provider value={{ 
          user: mockUser, 
          isLoggedIn: true, 
          setIsLoggedIn: jest.fn(), 
          setUser: jest.fn(), 
          globalEvents: {}, 
          setGlobalEvents: jest.fn(), 
          clubList: null
        }}>
          <ScheduleScreen />
        </AppContext.Provider>
      );
  
      expect(CalenderAgenda).toHaveBeenCalledWith(
        expect.objectContaining({
          rootCollection: 'Events',
          eventDocs: 'PersonalEvents',
          eventCollection: 'useremail@ucsd.com',
        }),
        expect.anything()
      );
    });
  
    it('renders with default email when user is null', () => {
      render(
        <AppContext.Provider value={{ 
            user: null, 
            isLoggedIn: true, 
            setIsLoggedIn: jest.fn(), 
            setUser: jest.fn(), 
            globalEvents: {}, 
            setGlobalEvents: jest.fn(), 
            clubList: null
          }}>
        <ScheduleScreen />
        </AppContext.Provider>
      );
  
      expect(CalenderAgenda).toHaveBeenCalledWith(
        expect.objectContaining({
          eventCollection: 'useremail@ucsd.edu',
        }),
        expect.anything()
      );
    });
  
    it('logs an error when user is null', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      render(
        <AppContext.Provider value={{ 
            user: null, 
            isLoggedIn: true, 
            setIsLoggedIn: jest.fn(), 
            setUser: jest.fn(), 
            globalEvents: {}, 
            setGlobalEvents: jest.fn(), 
            clubList: null
          }}>
        <ScheduleScreen />
        </AppContext.Provider>
      );
  
      expect(consoleSpy).toHaveBeenCalledWith('ERROR: User not found');
  
      consoleSpy.mockRestore(); // Restore original console.log behavior
    });
  });