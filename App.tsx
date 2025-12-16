// App.tsx
import React from 'react';
import AppTemplate from './src/screens/templates/AppTemplate';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';

function App() {
  return (
    <AppTemplate>
      <NavigationContainer>
        <AppNavigation /> 
      </NavigationContainer>
    </AppTemplate>
  );
}

export default App;