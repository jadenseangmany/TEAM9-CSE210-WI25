import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ClubScreen from '../src/Screens/ClubScreen';
import { AppContext } from '../src/Context/AppContext';

jest.mock('../src/Screens/ClubScreen', () => jest.fn(() => null));


describe('ClubScreen', () => {
  it('should render ClubScreen without crashing', () => {
    const mockClubList = {
      _j: [
        { Name: 'Test Club 1', Description: 'Test Description 1', Email: '' },
        { Name: 'Test Club 2', Description: 'Test Description 2', Email: '' },
        { Name: 'Test Club 3', Description: 'Test Description 3', Email: '' },
      ],
    };
    const mockUser = { email: 'useremail@ucsd.edu' };

    render(
      <AppContext.Provider value={{
          user: mockUser,
          isLoggedIn: true,
          setIsLoggedIn: jest.fn(),
          setUser: jest.fn(),
          globalEvents: {},
          setGlobalEvents: jest.fn(),
          clubList: mockClubList,
        }}
      >
        <ClubScreen />
      </AppContext.Provider>
    );

    expect(screen).toBeTruthy();
  });
});
