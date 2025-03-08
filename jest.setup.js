
import 'firebase/firestore';
// Mock { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars'
jest.mock('react-native-calendars', () => ({
    Agenda: jest.fn(),
    DateData: jest.fn(),
    AgendaEntry: jest.fn(),
    AgendaSchedule: jest.fn(),
  }));
// Mock Ionicons from 'react-native-vector-icons/Ionicons'
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');
// Mock { initializeApp } from 'firebase/app'
jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
  }));
// Mock { getAuth } from 'firebase/auth'
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
  }));
// Mock { getFirestore } from 'firebase/firestore'
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({
    collection: jest.fn(),
    doc: jest.fn(),
    getDocs: jest.fn(),
  })),
}));
// Mock StyleSheet from 'react-native'
jest.mock('react-native', () => {
  return {
    StyleSheet: {
      create: () => ({}),
    },
  };
});