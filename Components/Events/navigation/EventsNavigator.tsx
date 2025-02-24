import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventsListScreen from '../views/EventsListScreen';
import EventDetailsScreen from '../views/EventDetailsScreen';
import PostEventScreen from '../views/PostEventScreen';
import EditEventScreen from '../views/EditEventScreen';
import EditEventDetailScreen from '../views/EditEventDetailScreen';

export type EventStackParamList = {
  EventsList: undefined;
  EventDetails: { eventId: string };
  PostEvent: undefined;
  EditEvent: undefined;
  EditEventDetail: { eventId: string };
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
    <Stack.Screen
      name="PostEvent"
      component={PostEventScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditEvent"
      component={EditEventScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditEventDetail"
      component={EditEventDetailScreen}
      options={{ headerTitle: "Edit Event" }}
    />
  </Stack.Navigator>
);

export default EventsNavigator;
