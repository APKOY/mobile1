import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

import Loading from '../components/Loading';
import LoginScreen from '../screens/LoginScreen';
import DetailsScreen from '../screens/DetailsScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  if (checkingAuth) {
    return <Loading message="Verificando login..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="MainDrawer"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{ title: 'Detalhes' }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}