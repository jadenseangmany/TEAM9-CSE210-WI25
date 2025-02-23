import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventsListScreen from '../views/EventsListScreen';
import EventDetailsScreen from '../views/EventDetailsScreen';

export type EventStackParamList = {
  EventsList: undefined;
  EventDetails: { eventId: string };
};

const Stack = createStackNavigator<EventStackParamList>();

const EventsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="EventsList"
      component={EventsListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EventDetails"
      component={EventDetailsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default EventsNavigator;
