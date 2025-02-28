// General mock to solve some component issues
// ** GPT Generated Code

// __mocks__/react-native.js
console.log('Using manual react-native mock');
const RN = jest.requireActual('react-native');

// Patch Keyboard so that addListener and removeListener are defined
RN.Keyboard = {
  ...(RN.Keyboard || {}),
  addListener: jest.fn(() => ({ remove: jest.fn() })),
  removeListener: jest.fn(),
};

// Ensure Platform exists and then delete any existing constants before assigning ours
RN.Platform = RN.Platform || {};
if (RN.Platform.hasOwnProperty('constants')) {
  delete RN.Platform.constants;
}
RN.Platform.constants = {
  get: () => ({}),  // Force a dummy get function returning an empty object
  isTesting: true,
};

// Ensure NativeModules exists and then delete any existing UIManager before assigning ours
RN.NativeModules = RN.NativeModules || {};
if (RN.NativeModules.hasOwnProperty('UIManager')) {
  delete RN.NativeModules.UIManager;
}
RN.NativeModules.UIManager = {
  get: () => ({}),
};

module.exports = RN;