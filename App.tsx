import React, {useState, createContext, useEffect} from 'react';
import CalenderAgenda from './Components/Calendars/CalenderAgenda';
import { AgendaSchedule } from 'react-native-calendars';
import FirestoreService from './Components/Firestore/FirestoreService';
import { Button, Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import EventsNavigator from './Components/Events/navigation/EventsNavigator';


interface AppContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  globalEvents: AgendaSchedule;
  setGlobalEvents: (value: AgendaSchedule) => void;
}

export const AppContext = createContext<AppContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  globalEvents: {},
  setGlobalEvents: () => {},
});

const StudyGroupScreen = React.memo(() => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Study Group Screen</Text>
  </View>
));

const ScheduleScreen = React.memo(() => (
  <CalenderAgenda rootCollection='Events' eventDocs="PersonalEvents" eventCollection="useremail@ucsd.edu" />
));

const EventsScreen = React.memo(() => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Events Screen</Text>
  </View>
));


const AuthContent = () => {
  const { authorize, clearSession, user, error } = useAuth0();

  const handleAuth = async (action: 'login' | 'logout') => {
    try {
      if (action === 'login') {
        await authorize();
      } else {
        await clearSession();
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#F5FCFF',
    },
    authContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    statusText: {
      flex: 1,
      marginRight: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.statusText}>
          {user ? `Logged in as ${user.name}` : 'Guest Mode'}
        </Text>
        <Button
          title={user ? 'Log Out' : 'Log In'}
          onPress={() => handleAuth(user ? 'logout' : 'login')}
        />
      </View>
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            'Study Group': 'people-outline',
            Schedule: 'calendar-outline',
            Events: 'today-outline',
          };
          return (
            <Ionicons
              name={iconMap[route.name as keyof typeof iconMap]}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Study Group" component={StudyGroupScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Events" component={EventsNavigator} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [globalEvents, setGlobalEvents] = useState<AgendaSchedule>({});

  useEffect(() => {
    FirestoreService.fetchGlobalEvents();
  }, []);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, globalEvents,setGlobalEvents }}>
      <Auth0Provider
        domain="dev-vzdbpbyhl1xapn6j.us.auth0.com"
        clientId="6bZf97q4yMUYoFLV92YlR919TSJRwbbC"
      >
        <NavigationContainer>
          <AuthContent />
          <AppNavigator />
        </NavigationContainer>
      </Auth0Provider>
    </AppContext.Provider>
  );
};

export default App;