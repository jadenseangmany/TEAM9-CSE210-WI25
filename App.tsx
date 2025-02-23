import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalenderModule from './Components/Calenders/CalenderModule';
import EventsNavigator from './Components/Events/navigation/EventsNavigator';

const StudyGroupScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Study Group Screen</Text>
  </View>
);

const ScheduleScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <CalenderModule darkMode={false}/>
  </View>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconMap: { [key: string]: string } = {
              'Study Group': 'people-outline',
              'Schedule': 'calendar-outline',
              'Events': 'today-outline',
            };
            const iconName = iconMap[route.name] || 'help-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Study Group" component={StudyGroupScreen} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
        <Tab.Screen name="Events" component={EventsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


