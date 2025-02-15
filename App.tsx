import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalenderModule from './Components/Calenders/CalenderModule';
import {useAuth0, Auth0Provider} from 'react-native-auth0';

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

const EventsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Events Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function App() {
  const {authorize, clearSession, user, error, isLoading} = useAuth0();

  const onLogin = async () => {
    console.log("Login button pressed!")
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };
  
  const onLogout = async () => {
    console.log("Logout button pressed!")
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      padding: 20,
      width: '100%',
      minHeight: 50,
      marginTop: 20,
    },
    rowContainer: {
      flexDirection: 'row',    // 关键属性：水平排列
      alignItems: 'center',    // 垂直居中
      justifyContent: 'space-between', // 元素间距
      width: '100%',           // 占满容器宽度
      paddingHorizontal: 10,   // 水平内边距
    },
    textStyle: {
      marginRight: 15,         // 文字和按钮间距
      flexShrink: 1,           // 允许文字收缩
    }
  });

  // if (isLoading) {
  //   return <View style={styles.container}><Text>Loading</Text></View>;
  // }

  const loggedIn = user !== undefined && user !== null;
  
  return (
    <Auth0Provider domain={"dev-vzdbpbyhl1xapn6j.us.auth0.com"} clientId={"6bZf97q4yMUYoFLV92YlR919TSJRwbbC"}>
      <NavigationContainer>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <Text style={styles.textStyle}>
                {loggedIn ? `Logged in as ${user?.name}` : "Not logged in"}
              </Text>
              <Button
                onPress={loggedIn ? onLogout : onLogin}
                title={loggedIn ? 'Log Out' : 'Log In'}
              />
            </View>
            {error && <Text>{error.message}</Text>}
          </View>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              // Mapping route names to Ionicons
              const iconMap: { [key: string]: string } = {
                'Study Group': 'people-outline',
                Schedule: 'calendar-outline',
                Events: 'today-outline',
              };

              const iconName = iconMap[route.name] || 'help-circle-outline'; // Default icon
              return Ionicons ? <Ionicons name={iconName} size={size} color={color} /> : null;

            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Study Group" component={StudyGroupScreen} />
          <Tab.Screen name="Schedule!!!!!" component={ScheduleScreen} />
          <Tab.Screen name="Events" component={EventsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Auth0Provider>
  );
}
