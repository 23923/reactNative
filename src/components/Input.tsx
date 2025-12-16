import React from "react";
import { TextInput, StyleSheet} from "react-native";

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
}

function Input(props: InputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor="#7A7A7A"
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: "100%",
    borderColor: "#dcdcdc",
    borderWidth: 1.5,
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    paddingHorizontal: 18,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default Input;
