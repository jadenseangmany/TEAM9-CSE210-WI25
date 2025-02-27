import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventScreen from '../Screens/EventScreen';
import ScheduleScreen from '../Screens/ScheduleScreen';
import ClubScreen from '../Screens/ClubScreen';


const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Schedule'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Clubs: 'people-outline',
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
      <Tab.Screen name="Clubs" component={ClubScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Events" component={EventScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;