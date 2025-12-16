import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuthStore } from '../../stores/authStore';

function LoginPage() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async () => {
    if (!username || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const result = await login(username, password);
    
    if (!result.success) {
      Alert.alert('Erreur', result.error || 'Une erreur s\'est produite');
    }
  };

  return (
    <ImageBackground 
      source={require('../../../assets/images/Background.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.loginBox}>
          <Image 
            source={require('../../../assets/images/home.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          
          <Text style={styles.title}>Bienvenue</Text>

          <Input
            placeholder="Nom d'utilisateur"
            value={username}
            onChangeText={setUsername}
          />

          <Input
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Button 
            title={isLoading ? "Connexion..." : "Se connecter"} 
            onPress={handleSubmit} 
          />
          
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
    letterSpacing: 1,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginPage;
