// Config for Jest
// ** GPT Generated Code

module.exports = {
  preset: 'react-native',
  // setup jest.setup.js could go here
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '^react-native/(.*)$': '<rootDir>/__mocks__/react-native.js',
    '^react-native-calendars$': '<rootDir>/__mocks__/react-native-calendars.js',
    '^react-native/Libraries/Utilities/Platform$': '<rootDir>/__mocks__/react-native.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-calendars|react-native-swipe-gestures|@react-native-firebase|firebase|@firebase|react-native-vector-icons)/)',
  ],
};