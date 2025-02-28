// /**
//  * @format
//  */

// import React from 'react';
// import ReactTestRenderer from 'react-test-renderer';
// import App from '../App';

// test('renders correctly', async () => {
//   await ReactTestRenderer.act(() => {
//     ReactTestRenderer.create(<App />);
//   });
// });

// __tests__/App.test.tsx
// import React from 'react';
// import { render } from '@testing-library/react-native';
// // Import a test renderer instead of the full App if it has too many dependencies
// import App from '../App';

// describe('App', () => {
//   it('renders correctly', () => {
//     // Simplified test until you fix all dependencies
//     // expect(true).toBe(true);
    
//     // Once dependencies are fixed:
//     const { getByText } = render(<App />);
//     expect(getByText('Events')).toBeTruthy();
//   });
// });

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EventsListScreen from '../src/Screens/Views/Events/EventsListScreen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { filterEvents } from '../src/Controller/EventsController';

// filepath: src/Screens/Views/Events/EventsListScreen.test.tsx

// Mock dependencies
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useIsFocused: jest.fn(),
}));

jest.mock('../src/Controller/EventsController', () => ({
  filterEvents: jest.fn(),
}));

jest.mock('../src/Components/SearchBar', () => 'SearchBar');
jest.mock('../src/Screens/Views/Events/EventCard', () => 'EventCard');

describe('EventsListScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useIsFocused as jest.Mock).mockReturnValue(true);
    (filterEvents as jest.Mock).mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<EventsListScreen />);
    expect(getByText('Events Nearby')).toBeTruthy();
  });

  it('renders search bar and filters', () => {
    const { getByPlaceholderText, getByText } = render(<EventsListScreen />);
    expect(getByPlaceholderText('Search')).toBeTruthy();
    expect(getByText('Day')).toBeTruthy();
    expect(getByText('Category')).toBeTruthy();
    expect(getByText('Type')).toBeTruthy();
  });

  it('updates events list when filters change', () => {
    const { getByText } = render(<EventsListScreen />);
    fireEvent.press(getByText('Today'));
    expect(filterEvents).toHaveBeenCalledWith({
      day: 'Today',
      category: 'All',
      type: 'All',
      searchQuery: '',
    });
  });

  it('navigates to PostEvent screen when POST EVENT button is pressed', () => {
    const { getByText } = render(<EventsListScreen />);
    fireEvent.press(getByText('POST EVENT'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('PostEvent');
  });

  it('navigates to EditEvent screen when EDIT EVENT button is pressed', () => {
    const { getByText } = render(<EventsListScreen />);
    fireEvent.press(getByText('EDIT EVENT'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('EditEvent');
  });
});