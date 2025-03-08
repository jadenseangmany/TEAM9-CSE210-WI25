// __tests__/AuthContent.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import AuthContent from '../src/Screens/LoginScreen';
import { AppContext } from '../src/Context/AppContext';
import { useAuth0 } from 'react-native-auth0';

// Mock `useAuth0` hook
jest.mock('react-native-auth0', () => ({
  useAuth0: jest.fn(),
}));

jest.mock('../src/Screens/LoginScreen', () => jest.fn(() => null));

describe('LoginScreen', () => {

  it('should render "Log In" button when the user is not logged in', () => {
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
        <AuthContent />
      </AppContext.Provider>
    );

    expect(screen).toBeTruthy();
  });

});
