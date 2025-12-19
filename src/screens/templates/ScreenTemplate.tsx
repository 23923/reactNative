// src/screens/templates/ScreenTemplate.tsx
import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenTemplateProps extends PropsWithChildren {
  isDarkMode?: boolean;
}

function ScreenTemplate({ children, isDarkMode = false }: ScreenTemplateProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
        },
      ]}
    >
      <View style={styles.inner}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});

export default ScreenTemplate;
