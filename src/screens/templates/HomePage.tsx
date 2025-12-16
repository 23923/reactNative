// src/screens/HomePage.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { useAuthStore } from '../../stores/authStore';
import Button from '../../components/Button';

function HomePage() {
  const { logout } = useAuthStore();

  return (
    <ImageBackground 
      source={require('../../../assets/images/Background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <Button
          title="Déconnexion"
          onPress={logout}
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
        />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image Section */}
        <View style={styles.productImageContainer}>
          <Image 
            source={require('../../../assets/images/home.png')} 
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Text Content Section */}
        <View style={styles.contentContainer}>
          <Text style={styles.mainTitle}>
            Coffee so good,{'\n'}your taste buds{'\n'}will love it
          </Text>
          
          <Text style={styles.subtitle}>
            The best grain, the finest roas, the{'\n'}most powerful flavor.
          </Text>

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Get Started Button */}
          <Button
            title="Get started"
            onPress={logout}
            style={styles.getStartedButton}
            textStyle={styles.getStartedButtonText}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoutButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 0,
    height: 40,
    width: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutButtonText: {
    color: '#00A859',
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  productImageContainer: {
    width: '100%',
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 20,
  },
  productImage: {
    width: '75%',
    height: '100%',
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A9A9A9',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 25,
    marginBottom: 35,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3D3D3D',
  },
  activeDot: {
    width: 28,
    borderRadius: 6,
    backgroundColor: '#00A859',
  },
  getStartedButton: {
    backgroundColor: '#00A859',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 0,
    height: 56,
  },
  getStartedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default HomePage;