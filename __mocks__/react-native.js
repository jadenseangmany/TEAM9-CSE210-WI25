// __mocks__/react-native.js
const actualRN = jest.requireActual('react-native');

module.exports = {
  ...actualRN,
  StyleSheet: {
    create: jest.fn((styles) => styles), // Mocking create to simply return the styles object
  },
};
