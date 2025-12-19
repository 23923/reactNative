// src/screens/HomePage.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

function HomePage() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Categories' as never);
  };

  return (
    <ImageBackground 
      source={require('../../../assets/images/Background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Logout Button */}

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
            The best grain, the finest roast, the{'\n'}most powerful flavor.
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
            onPress={handleGetStarted}
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
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 80,
  },
  productImageContainer: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  productImage: {
    width: '80%',
    height: '100%',
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A2A2A2',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
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
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D8B68A',
  },
  activeDot: {
    width: 28,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00512C',
  },
  getStartedButton: {
    backgroundColor: '#00512C',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 0,
    height: 56,
    width: '85%',
    maxWidth: 320,
  },
  getStartedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default HomePage;
