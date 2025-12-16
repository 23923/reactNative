// src/navigation/AppNavigation.tsx
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../stores/authStore';
import LoginPage from '../screens/templates/LoginPage';
import HomePage from '../screens/templates/HomePage';
import BootSplash from "react-native-bootsplash";


const Stack = createNativeStackNavigator();

function AppNavigation() {
  // Surveiller l'état d'authentification
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  useEffect(() => {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    
    BootSplash.hide({ fade: true });
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        // 🔓 Screens Publiques (non connecté)
        <>
          <Stack.Screen name="Login" component={LoginPage} />
          {/* Ajoutez Register, ForgotPassword, etc. */}
        </>
      ) : (
        // 🔐 Screens Privées (connecté)
        <>
          <Stack.Screen name="Home" component={HomePage} />
          {/* <Stack.Screen name="Profile" component={ProfilePage} /> */}
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigation;