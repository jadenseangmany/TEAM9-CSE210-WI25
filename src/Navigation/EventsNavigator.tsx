import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventsListScreen from '../Screens/Views/Events/EventsListScreen';
import EventDetailsScreen from '../Screens/Views/Events/EventDetailsScreen';
import PostEventScreen from '../Screens/Views/Events/PostEventScreen';
import EditEventScreen from '../Screens/Views/Events/EditEventScreen';
import EditEventDetailScreen from '../Screens/Views/Events/EditEventDetailScreen';

export type EventStackParamList = {
  EventsList: undefined;
  EventDetails: { eventId: string };
  PostEvent: undefined;
  EditEvent: undefined;
  EditEventDetail: { eventId: string };
};

const Stack = createNativeStackNavigator<EventStackParamList>();

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
      options={{ headerTitle: "Event Details" }}
    />
    <Stack.Screen
      name="PostEvent"
      component={PostEventScreen}
      options={{ headerTitle: "Post Event" }}
    />
    <Stack.Screen
      name="EditEvent"
      component={EditEventScreen}
      options={{ headerTitle: "Your Event List" }}
    />
    <Stack.Screen
      name="EditEventDetail"
      component={EditEventDetailScreen}
      options={{ headerTitle: "Edit Event" }}
    />
  </Stack.Navigator>
);

export default EventsNavigator;

