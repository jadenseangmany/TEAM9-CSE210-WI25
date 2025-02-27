import React from 'react';
import {Auth0Provider} from 'react-native-auth0';

const AuthWrapper = ({children}: {children: React.ReactNode}) => (
  <Auth0Provider
    domain="dev-vzdbpbyhl1xapn6j.us.auth0.com"
    clientId="6bZf97q4yMUYoFLV92YlR919TSJRwbbC"
  >
    {children}
  </Auth0Provider>
);

export default AuthWrapper;