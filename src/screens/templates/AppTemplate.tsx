// src/screens/templates/AppTemplate.tsx
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenTemplate from './ScreenTemplate';
import React, { PropsWithChildren, useEffect } from 'react';
import { useThemeStore } from '../../stores/themeStore';

function AppTemplate(props: PropsWithChildren) {
  const systemColorScheme = useColorScheme();
  const { isDarkMode, setDarkMode } = useThemeStore();

  // Synchroniser avec le thème système au démarrage
  useEffect(() => {
    if (systemColorScheme) {
      setDarkMode(systemColorScheme === 'dark');
    }
  }, [setDarkMode, systemColorScheme]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScreenTemplate isDarkMode={isDarkMode}>
        {props.children}
      </ScreenTemplate>
    </SafeAreaProvider>
  );
}

export default AppTemplate;