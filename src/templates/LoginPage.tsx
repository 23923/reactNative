import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>Login Page</Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
    marginBottom: 30,
    letterSpacing: 1,
    opacity: 0.9,
    transform: [{ translateY: -5 }],
  },
});

export default LoginPage;
