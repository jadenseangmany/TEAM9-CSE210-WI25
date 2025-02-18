import React, {useState, createContext, useEffect} from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalEvents from './Components/GlobalEvents/GlobalEvents';
import CalenderAgenda from './Components/Calenders/CalenderAgenda';
import { AgendaSchedule } from 'react-native-calendars';
import FirestoreService from './Components/Firestore/FirestoreService';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


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

const GlobalEventsScreen = () => (
  // eventDocs is 'PersonalEvents' or 'GlobalEvents'
  // eventCollection is 'Date' or useremail
  <CalenderAgenda eventDocs='GlobalEvents' eventCollection='Date'/>
);

const StudyGroupScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Study Group Screen</Text>
  </View>
);

const ScheduleScreen = () => (
  // eventDocs is 'PersonalEvents' or 'GlobalEvents'
  // eventCollection is 'Date' or useremail
  <CalenderAgenda eventDocs='PersonalEvents' eventCollection='useremail@ucsd.edu'/>
);

const EventsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Events Screen</Text>
  </View>
);


// TODO: Placeholder login screen, Replace with actual login screen
const LoginScreen = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleLogin = () => {
    // assume login is successful
    onLoginSuccess();
    navigation.navigate('bottomTab');
  }

  // const navigation = useNavigation(); 

  return (
    <View style={{flex:1, margin:50}}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const Tab = createBottomTabNavigator();
function BottomTabs() {
  return (
    <Tab.Navigator
      detachInactiveScreens={false} 
      initialRouteName='Global Events'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconMap: { [key: string]: string } = {
            'Global Events': 'globe-outline',
            'Study Group': 'people-outline',
            Schedule: 'calendar-outline',
            Events: 'today-outline',
          };
          const iconName = iconMap[route.name] || 'help-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Global Events" component={GlobalEventsScreen} />
      <Tab.Screen name="Study Group" component={StudyGroupScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [globalEvents, setGlobalEvents] = useState<AgendaSchedule>({});
  
  useEffect(() => {
    FirestoreService.fetchGlobalEvents();
  }, []);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, globalEvents,setGlobalEvents }}>
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" children={() => <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />}  />
        <Stack.Screen name="bottomTab" component={BottomTabs} />
      </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
    
  );
  
}
