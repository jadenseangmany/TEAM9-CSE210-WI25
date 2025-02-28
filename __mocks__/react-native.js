// __mocks__/react-native.js
const reactNative = jest.createMockFromModule('react-native');

// Add StyleSheet mock
reactNative.StyleSheet = {
  create: jest.fn(styles => styles),
  hairlineWidth: 1,
  absoluteFill: {},
  flatten: jest.fn(styles => styles),
};

// Add other required mocks
reactNative.Alert = { alert: jest.fn() };
reactNative.Dimensions = { 
  get: jest.fn().mockReturnValue({ width: 375, height: 812 }) 
};
reactNative.Modal = 'Modal';
reactNative.View = 'View';
reactNative.Text = 'Text';
reactNative.TouchableOpacity = 'TouchableOpacity';
// Add any other components you're using

module.exports = reactNative;