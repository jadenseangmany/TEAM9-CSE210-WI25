// __mocks__/firebase/auth.js
const auth = jest.createMockFromModule('firebase/auth');

auth.getAuth = jest.fn(() => ({
  currentUser: null,
  // Add other auth methods/properties your components use
}));

auth.signInWithEmailAndPassword = jest.fn();
auth.createUserWithEmailAndPassword = jest.fn();
auth.signOut = jest.fn();
// Add any other auth methods you use

module.exports = auth;