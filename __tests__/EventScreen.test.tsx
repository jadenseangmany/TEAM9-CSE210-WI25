import React from 'react';
import { render, screen } from '@testing-library/react-native';
import EventsNavigator from '../src/Navigation/EventsNavigator';


jest.mock('../src/Screens/Views/Events/EventsListScreen', () => null);
  jest.mock('react-native-dropdown-picker', () => null);
  
  jest.mock('../src/Controller/EventsController', () => null);
  
  jest.mock('../src/Components/SearchBar', () => null);
  
  jest.mock('../src/Screens/Views/Events/EventCard', () => null);

// Mock { createNativeStackNavigator } from '@react-navigation/native-stack';
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: () => null,
  })),
}));

describe('EventsNavigator', () => {
  it('should render EventsNavigator without crashing', () => {
    render(
        <EventsNavigator />
    );

    // Expect the component to render without crashing
    expect(screen).toBeTruthy();
  });
});
