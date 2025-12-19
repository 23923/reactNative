import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export default function Button({ title, onPress, style, textStyle, children }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.submitButton, style]} onPress={onPress}>
      {children ? children : <Text style={[styles.submitButtonText, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
