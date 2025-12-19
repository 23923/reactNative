import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../../components/ProductCard';
import NavButton from '../../components/NavButton';
import productsData from '../../data/products.json';
import { useFavoritesStore } from '../../stores/favoritesStore';

const productImages: { [key: string]: any } = {
  "cappuccino": require("../../../assets/images/café_liégeois.png"),
  "Cappuccino_withchocolat": require("../../../assets/images/Cappuccino_withchocolat.png"),
  "Latte_with_milk": require("../../../assets/images/Latte_with_milk.png"),
  "home": require("../../../assets/images/home.png"),
};

function FavoritesPage() {
  const navigation = useNavigation();
  
  // Utiliser le store global pour les favoris
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const favoriteProducts = productsData.filter(p => favorites.includes(p.id));

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail' as never, { product } as never);
  };

  const handleHomePress = () => {
    navigation.navigate('Categories' as never);
  };

  const handleCartPress = () => {
    navigation.navigate('Cart' as never);
  };

  const handleProfilePress = () => {
    // navigation.navigate('Profile' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorite</Text>
      </View>

      {/* Products Grid */}
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const imageSource = productImages[item.image] || productImages["home"];
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun favori pour le moment</Text>
          </View>
        }
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavButton 
          iconName="home-outline" 
          onPress={handleHomePress} 
        />
        <NavButton 
          iconName="heart" 
          onPress={() => {}} 
          isActive={true}
        />
        <NavButton 
          iconName="cart-outline" 
          onPress={handleCartPress} 
        />
        <NavButton 
          iconName="person-outline" 
          onPress={handleProfilePress} 
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2F2D2C',
  },
  productsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#9B9B9B',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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

export default FavoritesPage;
