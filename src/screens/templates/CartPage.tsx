import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../stores/cartStore';
import { useFavoritesStore } from '../../stores/favoritesStore';
import NavButton from '../../components/NavButton';
import Button from '../../components/Button';
// Mapping des images de produits
const productImages: { [key: string]: any } = {
  "cappuccino": require("../../../assets/images/cafe_liegeois.png"),
  "Cappuccino_withchocolat": require("../../../assets/images/Cappuccino_withchocolat.png"),
  "Latte_with_milk": require("../../../assets/images/Latte_with_milk.png"),
  "home": require("../../../assets/images/home.png"),
};

function CartPage() {
  const navigation = useNavigation();
  const { items, updateQuantity, getSubtotal, getDiscount, getTotal } = useCartStore();
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const getProductImage = (imageKey: string) => {
    return productImages[imageKey] || productImages.home;
  };

  const handleHomePress = () => {
    navigation.navigate('Categories' as never);
  };

  const handleCategoriesPress = () => {
    navigation.navigate('Categories' as never);
  };

  const handleFavoritesPress = () => {
    navigation.navigate('Favorites' as never);
  };

  const handleCartPress = () => {
    navigation.navigate('Cart' as never);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleBuy = () => {
    console.log('Achat effectué!', items);
    // Ici vous pouvez ajouter la logique de paiement
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Button onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </Button>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        {items.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>Votre panier est vide</Text>
            <Button 
              title="Voir les produits" 
              onPress={handleCategoriesPress}
              style={styles.shopButton}
              textStyle={styles.shopButtonText}
            />
          </View>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              {/* Product Image */}
              <View style={styles.imageContainer}>
                <Image
                  source={getProductImage(item.image)}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </View>

              {/* Product Info */}
              <View style={styles.productInfo}>
                <View style={styles.productHeader}>
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productDescription}>{item.description}</Text>
                    <Text style={styles.productPrice}>Rp{item.price.toLocaleString()}</Text>
                  </View>
                  <Button 
                    style={[styles.favoriteButton, favorites.includes(item.id) && styles.favoriteButtonActive]}
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <Text style={[styles.heartIcon, favorites.includes(item.id) && styles.heartIconActive]}>♡</Text>
                  </Button>
                </View>

                {/* Size and Sugar */}
                <View style={styles.optionsContainer}>
                  <View style={styles.optionRow}>
                    <Text style={styles.optionLabel}>Cap Size: </Text>
                    <Text style={styles.optionValue}>{item.cupSize}</Text>
                    <View style={styles.quantitySection}>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <Button
                        style={styles.quantityButtonPlus}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Text style={styles.quantityButtonTextPlus}>+</Text>
                      </Button>
                    </View>
                  </View>
                  <View style={styles.optionRow}>
                    <Text style={styles.optionLabel}>Level Sugar: </Text>
                    <Text style={styles.optionValue}>{item.sugarLevel}</Text>
                    <Button
                      style={styles.quantityButtonMinus}
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Text style={styles.quantityButtonTextMinus}>−</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}

        {items.length > 0 && (
          <>
            {/* Order Summary */}
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>Rp {getSubtotal().toLocaleString()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount</Text>
                <Text style={styles.summaryValue}>Rp {getDiscount().toLocaleString()}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>Rp {getTotal().toLocaleString()}</Text>
              </View>
            </View>

            {/* Payment Methods */}
            <View style={styles.paymentContainer}>
              <Text style={styles.paymentTitle}>Payment</Text>
              <View style={styles.paymentMethods}>
                <View style={[styles.paymentMethod, styles.paymentMethodActive]}>
                  <Text style={styles.paymentText}>VISA</Text>
                </View>
                <View style={styles.paymentMethod}>
                  <Text style={styles.paymentText}>PayPal</Text>
                </View>
                <View style={styles.paymentMethod}>
                  <Text style={styles.paymentText}>Apple</Text>
                </View>
                <View style={styles.paymentMethod}>
                  <Text style={styles.paymentText}>GPay</Text>
                </View>
              </View>
            </View>

            {/* Buy Button */}
            <Button 
              title="Buy" 
              onPress={handleBuy}
              style={styles.buyButton}
              textStyle={styles.buyButtonText}
            />
          </>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavButton iconName="home" onPress={handleHomePress} />
        <NavButton iconName="heart-outline" onPress={handleFavoritesPress} />
        <NavButton iconName="bag-outline" onPress={handleCartPress} isActive={true} />
        <NavButton iconName="person-outline" onPress={handleProfilePress} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backIcon: {
    fontSize: 24,
    color: '#2F2D2C',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2F2D2C',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#9B9B9B',
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: '#2F4B26',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2F2D2C',
  },
  productDescription: {
    fontSize: 11,
    color: '#9B9B9B',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2F4B26',
    marginTop: 4,
  },
  favoriteButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  favoriteButtonActive: {
    backgroundColor: '#FDECEF',
    borderRadius: 14,
  },
  heartIcon: {
    fontSize: 18,
    color: '#2F4B26',
  },
  heartIconActive: {
    color: '#ED5151',
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  optionLabel: {
    fontSize: 11,
    color: '#9B9B9B',
  },
  optionValue: {
    fontSize: 11,
    color: '#2F4B26',
    fontWeight: '600',
    flex: 1,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2F2D2C',
    marginRight: 8,
  },
  quantityButtonPlus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2F4B26',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonTextPlus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  quantityButtonMinus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  quantityButtonTextMinus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F2D2C',
  },
  summaryContainer: {
    marginTop: 16,
    paddingTop: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#9B9B9B',
  },
  summaryValue: {
    fontSize: 13,
    color: '#2F2D2C',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2F2D2C',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2F2D2C',
  },
  paymentContainer: {
    marginTop: 16,
  },
  paymentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2F2D2C',
    marginBottom: 10,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentMethod: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  paymentMethodActive: {
    borderColor: '#2F4B26',
    backgroundColor: '#fff',
  },
  paymentText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2F2D2C',
  },
  buyButton: {
    backgroundColor: '#2F4B26',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  bottomSpacing: {
    height: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
});

export default CartPage;
