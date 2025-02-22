import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalenderModule from './Components/Calenders/CalenderModule';
import CustomSearchBar from './Components/SearchBar'; // imported for search bar
import { createStackNavigator } from '@react-navigation/stack'; // imported for placement
import { EventsScreen } from './Components/EventsPage';

const ClubsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Clubs</Text>
  </View>
);

const ScheduleScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <CalenderModule darkMode={false}/>
  </View>
);

// const EventsScreen = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <EventsPage darkMode={false}/>
//   </View>
// );

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // placement

// Define screen configurations
const screenConfig = [
  { name: 'Clubs', component: ClubsScreen, icon: 'people-outline', hasSearchBar: true, placeholder: 'Search Clubs' },
  { name: 'Schedule', component: ScheduleScreen, icon: 'calendar-outline', hasSearchBar: false },
  { name: 'Events', component: EventsScreen, icon: 'today-outline', hasSearchBar: true, placeholder: 'Search Events' },
];

// Helper function to generate Stack Navigator for screens that need a search bar
const createScreenStack = (Component, hasSearchBar, placeholder) => {
  return () => (
    <Stack.Navigator>
      <Stack.Screen
        name='Screen'
        component={Component}
        options={{
          headerRight: hasSearchBar ? () => <CustomSearchBar placeholder={placeholder} /> : undefined,
          headerTitle: '',
          headerStyle: { backgroundColor: 'white' },
          headerRightContainerStyle: { paddingRight: 10 },
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
              const screen = screenConfig.find(s => s.name === route.name);
              return <Ionicons name={screen?.icon || 'help-circle-outline'} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
            {screenConfig.map(({ name, component, hasSearchBar, placeholder }) => (
              <Tab.Screen
                key={name}
                name={name}
                component={hasSearchBar ? createScreenStack(component, hasSearchBar, placeholder) : component}
              />
            ))}
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
              /*
            // Mapping route names to Ionicons
            const iconMap: { [key: string]: string } = {
              'Club': 'people-outline',
              Schedule: 'calendar-outline',
              Events: 'today-outline',

            const iconName = iconMap[route.name] || 'help-circle-outline'; // Default icon
            return Ionicons ? <Ionicons name={iconName} size={size} color={color} /> : null;

          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name='Clubs' component={ClubsScreen} />
        <Tab.Screen name='Schedule' component={ScheduleScreen} />
        <Tab.Screen name='Events' component={EventsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
*/
