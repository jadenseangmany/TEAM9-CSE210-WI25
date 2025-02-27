// src/Screens/AuthContent.tsx
import React, {useContext, useEffect} from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { AppContext } from '../Context/AppContext';

const AuthContent = () => {
  const { authorize, clearSession, user, error } = useAuth0();
  const {isLoggedIn, setIsLoggedIn} = useContext(AppContext);

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
  useEffect(() => {
    if (user) {
      console.log('User:', user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

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

export default AuthContent;