// src/screens/templates/ScreenTemplate.tsx
import React, { PropsWithChildren } from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenTemplateProps extends PropsWithChildren {
  isDarkMode?: boolean;
}

function ScreenTemplate({ children, isDarkMode = false }: ScreenTemplateProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
        flex: 1
      }}
    >
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

export default ScreenTemplate;