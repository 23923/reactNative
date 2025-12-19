import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface NavButtonProps {
  iconName: string;
  onPress: () => void;
  isActive?: boolean;
  iconSize?: number;
  style?: ViewStyle;
}

export default function NavButton({ 
  iconName, 
  onPress, 
  isActive = false, 
  iconSize = 24,
  style 
}: NavButtonProps) {
  return (
    <TouchableOpacity style={[styles.navItem, style]} onPress={onPress}>
      {isActive ? (
        <View style={styles.activeIconContainer}>
          <Icon name={iconName} size={20} color="#FFFFFF" />
        </View>
      ) : (
        <Icon name={iconName} size={iconSize} color="#8D8D8D" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  navItem: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#2F4B26',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
