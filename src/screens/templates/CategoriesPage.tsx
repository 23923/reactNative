import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';
import CategoryFilter from '../../components/CategoryFilter';
import NavButton from '../../components/NavButton';
import Button from '../../components/Button';
import productsData from '../../data/products.json';
import usersData from '../../data/users.json';
import { useAuthStore } from '../../stores/authStore';
import { useFavoritesStore } from '../../stores/favoritesStore';

// Extraire toutes les catégories uniques des produits
const uniqueCategories = Array.from(new Set(productsData.map(product => product.category)));
const categories = ['All Coffee', ...uniqueCategories];

const productImages: { [key: string]: any } = {
  "cappuccino": require("C:/3eme/reactNative/AwesomeProject/assets/images/café_liégeois.png"),
  "Cappuccino_withchocolat": require("C:/3eme/reactNative/AwesomeProject/assets/images/Cappuccino_withchocolat.png"),
  "Latte_with_milk": require("C:/3eme/reactNative/AwesomeProject/assets/images/Latte_with_milk.png"),
};

// Photos des utilisateurs
const userPhotos: { [key: string]: any } = {
  "mariem": require("C:/3eme/reactNative/AwesomeProject/assets/images/mariem.png"),
  "yufi": require("C:/3eme/reactNative/AwesomeProject/assets/images/mariem.png"), // Placeholder pour yufi
  // Ajoutez d'autres photos d'utilisateurs ici
};

function CategoriesPage() {
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [selectedCategory, setSelectedCategory] = useState('All Coffee');
  
  // Utiliser le store global pour les favoris
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  // Recharger les données utilisateur depuis le JSON au montage
  useEffect(() => {
    if (user?.id) {
      const freshUserData = usersData.users.find((u) => u.id === user.id);
      if (freshUserData && (!user.photo || !user.location)) {
        setUser({
          ...user,
          photo: freshUserData.photo,
          location: freshUserData.location,
        });
      }
    }
  }, [user?.id]);

  // Obtenir le message de salutation selon l'heure
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Obtenir la première lettre du nom pour l'avatar par défaut
  const getInitial = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  };

  // Obtenir la photo de l'utilisateur
  const getUserPhoto = () => {
    if (user?.photo && userPhotos[user.photo]) {
      return userPhotos[user.photo];
    }
    return null;
  };

  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts = selectedCategory === 'All Coffee'
    ? productsData
    : productsData.filter(product => product.category === selectedCategory);

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail' as never, { product } as never);
  };

  const handleSearchPress = () => {
    navigation.navigate('Search' as never);
  };

  const handleHomePress = () => {
    navigation.navigate('Categories' as never);
  };

  const handleCartPress = () => {
    navigation.navigate('Cart' as never);
  };

  const handleFavoritesPress = () => {
    navigation.navigate('Favorites' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profileImage}>
            {getUserPhoto() ? (
              <Image 
                source={getUserPhoto()} 
                style={styles.profilePhoto}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.profileImageText}>{getInitial()}</Text>
            )}
          </View>
          <View style={styles.headerText}>
            <Text style={styles.locationLabel}>📍 {user?.location || 'Unknown Location'}</Text>
            <Text style={styles.greeting}>{getGreeting()}, {user?.name || 'User'}</Text>
          </View>
        </View>
        <Button 
          onPress={() => console.log('Notifications pressed')}
          style={styles.notificationButton}
        >
          <View style={styles.notificationDot} />
          <Image 
            source={require('../../../assets/images/alerte.png')} 
            style={styles.notificationIcon}
            resizeMode="contain"
          />
        </Button>
      </View>

      {/* Search Bar with Filter */}
      <View style={styles.searchContainer}>
        <SearchBar 
          value="" 
          onChangeText={() => {}} 
          onPress={handleSearchPress}
          placeholder="Search Coffee ..."
          editable={false}
          onFilterPress={() => console.log('Filter pressed')}
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Products Grid */}
      <View style={styles.productsContainer}>
        <FlatList
          data={filteredProducts.slice(0, 4)}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.productRow}
          renderItem={({ item }) => {
            // If the image field is a known local key, use require, else fallback
            let imageSource = productImages[item.image] || productImages["home"];
            // If the image field looks like a path (e.g. starts with 'assets/'), use uri
            if (typeof item.image === 'string' && item.image.startsWith('assets/')) {
              imageSource = { uri: item.image };
            }
            return (
              <ProductCard
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={imageSource}
                onPress={() => handleProductPress(item)}
                showFavorite={true}
                isFavorite={favorites.includes(item.id)}
                onFavoritePress={() => toggleFavorite(item.id)}
              />
            );
          }}
        />
      </View>


        {/* Special Offer */}
        <Text style={styles.specialOfferTitle}>Special Offer</Text>
        <View style={styles.specialOfferContainer}>
          <FlatList
            data={filteredProducts.slice(4, 6)}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.productRow}
            renderItem={({ item }) => (
              <ProductCard
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={require('../../../assets/images/home.png')}
                onPress={() => handleProductPress(item)}
                showFavorite={true}
                isFavorite={favorites.includes(item.id)}
                onFavoritePress={() => toggleFavorite(item.id)}
              />
            )}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavButton 
          iconName="home" 
          onPress={handleHomePress} 
          isActive={true} 
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
          onPress={() => {}} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
  },
  profileImageText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2F2D2C',
  },
  headerText: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#B7B7B7',
    fontWeight: '400',
    marginBottom: 4,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F2D2C',
  },
  notificationButton: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ED5151',
    zIndex: 1,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 8,
  },
  productsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  specialOfferTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F2D2C',
    marginBottom: 16,
    marginTop: 8,
    paddingHorizontal: 20,
  },
  specialOfferContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: '#F0F0F0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
});

export default CategoriesPage;
