import { useEffect } from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { logoutUser } from '../services/firebaseService';
import Loading from '../components/Loading';

const Drawer = createDrawerNavigator();

function LogoutScreen() {
  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Loading message="Saindo..." />
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7c3aed',
        },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#7c3aed',
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Início',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          title: 'Sair',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}