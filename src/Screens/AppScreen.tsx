import React, {useState, useEffect} from 'react';
import { AgendaSchedule } from 'react-native-calendars';
import FirestoreService from '../Services/FirestoreService';
import { NavigationContainer } from '@react-navigation/native';
import { Auth0Provider } from 'react-native-auth0';
import { AppContext } from '../Context/AppContext';
import AppNavigator from '../Navigation/AppNavigator';
import LoginScreen from '../Screens/LoginScreen';
import { SafeAreaView } from 'react-native';
import {ClubList} from '../Components/ClubModel';

const AppScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [globalEvents, setGlobalEvents] = useState<AgendaSchedule>({});
  const [user, setUser] = useState<any>(null);
  const [clubList, setClubList] = useState<any>(null);

  useEffect(() => {
    FirestoreService.fetchGlobalEvents();
    setClubList(ClubList());
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, globalEvents,setGlobalEvents, user, setUser, clubList }}>
        <Auth0Provider
            domain="dev-vzdbpbyhl1xapn6j.us.auth0.com"
            clientId="6bZf97q4yMUYoFLV92YlR919TSJRwbbC"
        >
            <NavigationContainer>
            <LoginScreen />
            <AppNavigator />
            </NavigationContainer>
        </Auth0Provider>
        </AppContext.Provider>
    </SafeAreaView>
  );
};

export default AppScreen;
