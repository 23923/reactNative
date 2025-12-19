import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import Button from '../../components/Button';
import { useAuthStore } from '../../stores/authStore';
import NavButton from '../../components/NavButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const userPhotos: { [key: string]: any } = {
  "mariem": require("../../../assets/images/mariem.png"),
  "yufi": require("../../../assets/images/mariem.png"),
};

function ProfilePage() {
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleHomePress = () => navigation.navigate('Categories' as never);
  const handleFavoritesPress = () => navigation.navigate('Favorites' as never);
  const handleCartPress = () => navigation.navigate('Cart' as never);
  const handleProfilePress = () => navigation.navigate('Profile' as never);

  const getUserPhoto = () => {
    if (user?.photo && userPhotos[user.photo]) {
      return userPhotos[user.photo];
    }
    return null;
  };

  const getInitial = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              {getUserPhoto() ? (
                <Image source={getUserPhoto()} style={styles.avatarImage} resizeMode="cover" />
              ) : (
                <Text style={styles.avatarInitial}>{getInitial()}</Text>
              )}
            </View>
            <View style={styles.nameBlock}>
              <Text style={styles.name}>{user?.name || 'User'}</Text>
              <Text style={styles.email}>{user?.email || 'Email inconnu'}</Text>
            </View>
          </View>

          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <Icon name="mail-outline" size={18} color="#2F2D2C" />
              <Text style={styles.infoText}>{user?.email || 'Email inconnu'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="location-outline" size={18} color="#2F2D2C" />
              <Text style={styles.infoText}>{user?.location || 'Location inconnue'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Deconnexion"
            onPress={logout}
            style={styles.logoutButton}
            textStyle={styles.logoutText}
          />
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavButton 
          iconName="home" 
          onPress={handleHomePress} 
        />
        <NavButton 
          iconName="heart-outline" 
          onPress={handleFavoritesPress} 
        />
        <NavButton 
          iconName="bag-outline" 
          onPress={handleCartPress} 
        />
        <NavButton 
          iconName="person-outline" 
          onPress={handleProfilePress} 
          isActive={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2F2D2C',
  },
  profileCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    gap: 16,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarInitial: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2F2D2C',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2F2D2C',
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  nameBlock: {
    flex: 1,
  },
  infoList: {
    width: '100%',
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  infoText: {
    fontSize: 14,
    color: '#2F2D2C',
    fontWeight: '500',
  },
  location: {
    fontSize: 14,
    color: '#777',
  },
  actions: {
    marginTop: 30,
  },
  logoutButton: {
    backgroundColor: '#00512C',
    paddingVertical: 14,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    marginHorizontal: -20,
  },
});

export default ProfilePage;
