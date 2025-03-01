// jest.setup.js


// Mock `react-native-calendars`
jest.mock('react-native-calendars', () => ({
    AgendaSchedule: jest.fn(),
  }));
  
  // Mock React Navigation
  jest.mock('@react-navigation/native', () => ({
    NavigationContainer: ({ children }) => children,
    useNavigation: jest.fn(),
  }));
  
  jest.mock('@react-navigation/bottom-tabs', () => ({
    createBottomTabNavigator: jest.fn(() => ({
      Navigator: ({ children }) => children,
      Screen: ({ children }) => children,
    })),
  }));
  
  // Mock React Native Auth0
  jest.mock('react-native-auth0', () => ({
    Auth0Provider: ({ children }) => children,
    useAuth0: () => ({
      authorize: jest.fn(),
      clearSession: jest.fn(),
      user: { name: 'Test User', email: 'test@example.com' },
      error: null,
    }),
  }));
  
  // Mock React Native Components
  jest.mock('react-native', () => ({
    SafeAreaView: ({ children }) => children,
  }));
  
  jest.mock('react-native-safe-area-context', () => ({
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
  }));
  
  jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');
  
  // Mock Firestore & Club Services
  jest.mock('./src/Services/FirestoreService', () => ({
    fetchGlobalEvents: jest.fn(),
  }));
  
  jest.mock('./src/Services/ClubService', () => ({
    ClubList: jest.fn(() => []),
  }));
  
  // Mock AppContext
  jest.mock('./src/Context/AppContext', () => {
    const actualModule = jest.requireActual('./src/Context/AppContext');
  
    return {
      __esModule: true,
      ...actualModule,
      AppContext: {
        Provider: ({ children }) => children,
      },
      useAppContext: () => ({
        isLoggedIn: false,
        setIsLoggedIn: jest.fn(),
        user: null,
        setUser: jest.fn(),
        globalEvents: {},
        setGlobalEvents: jest.fn(),
        clubList: null,
      }),
    };
  });
  
  // Mock TurboModuleRegistry (Fixes TurboModule errors)
  jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
    getEnforcing: jest.fn(() => ({})),
  }));
  