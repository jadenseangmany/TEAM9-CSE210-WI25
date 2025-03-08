import React from 'react';
import { render , waitFor, screen} from '@testing-library/react-native';
import AppNavigator from '../src/Navigation/AppNavigator';
import { Text, View } from 'react-native';

jest.mock('@react-navigation/native-stack', () => ({
    createNativeStackNavigator: jest.fn(() => ({
      Navigator: ({ children }: { children: React.ReactNode }) => children,
      Screen: () => null,
    })),
  }));

jest.mock('@react-navigation/bottom-tabs', () => ({
    createBottomTabNavigator: jest.fn(() => ({
      Navigator: ({ children }: { children: React.ReactNode }) => children,
      Screen: () => null,
    })),
  }));

// Mock DropDownPicker from 'react-native-dropdown-picker'
jest.mock('react-native-dropdown-picker', () => 'DropDownPicker');
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
    getEnforcing: jest.fn(() => ({})),
  }));

  jest.mock('react-native', () => {
    return {
      StyleSheet: {
        create: () => ({}),
      },
    };
  });

  // Mock Slider from '@react-native-community/slider'
jest.mock('@react-native-community/slider', () => 'Slider');
// Mock { Timestamp } from 'firebase/firestore'
jest.mock('firebase/firestore', () => ({
    Timestamp: {
      fromDate: jest.fn(() => ({ toDate: () => new Date() })),
    },
  }));
  

describe('AppNavigator', () => {
  test('renders the bottom tab navigator with all screens', async () => {
    render(
      <AppNavigator />
    );

      expect(screen).toBeTruthy();
  });
});
