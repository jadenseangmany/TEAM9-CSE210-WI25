// Set up global mocks for React Native components and APIs
jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    
    // Add StyleSheet mock
    RN.StyleSheet = {
      ...RN.StyleSheet,
      create: jest.fn(styles => styles),
    };
  
    // Add other required mocks for components you use
    RN.Alert = { alert: jest.fn() };
    RN.Dimensions = { 
      get: jest.fn().mockReturnValue({ width: 375, height: 812 }) 
    };
    
    return RN;
  });
  
  // Mock Firebase modules
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
      currentUser: null,
    })),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  }));
  
  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(() => ({})),
    collection: jest.fn(),
    getDocs: jest.fn(),
    addDoc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    doc: jest.fn(),
  }));
  
  // Mock any other Firebase services you use
  jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(() => ({})),
  }));