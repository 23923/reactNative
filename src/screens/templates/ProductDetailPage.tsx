import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCartStore } from '../../stores/cartStore';
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');

// Mapping des images de produits
const productImages: { [key: string]: any } = {
  "cappuccino": require("../../../assets/images/café_liégeois.png"),
  "Cappuccino_withchocolat": require("../../../assets/images/Cappuccino_withchocolat.png"),
  "Latte_with_milk": require("../../../assets/images/Latte_with_milk.png"),
  "home": require("../../../assets/images/home.png"),
};

function ProductDetailPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params as any;

  const [selectedSize, setSelectedSize] = useState('Small');
  const [selectedSugar, setSelectedSugar] = useState('No Sugar');
  const [showFullAbout, setShowFullAbout] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: 1,
      cupSize: selectedSize,
      sugarLevel: selectedSugar,
    });
    navigation.navigate('Cart' as never);
  };

  // Récupérer l'image du produit depuis le JSON
  const getProductImage = () => {
    if (product.image && productImages[product.image]) {
      return productImages[product.image];
    }
    return productImages["home"]; // Image par défaut
  };

  const aboutText = product.about || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat....";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Image Section */}
      <View style={styles.imageSection}>
        <Image 
          source={getProductImage()} 
          style={styles.productImage}
          resizeMode="cover"
        />
        
        {/* Header Buttons */}
        <View style={styles.headerButtons}>
          <Button style={styles.iconButton} onPress={handleBackPress}>
            <Text style={styles.iconText}>‹</Text>
          </Button>
          <Button style={styles.iconButton} onPress={() => {}}>
            <Text style={styles.heartIcon}>♡</Text>
          </Button>
        </View>

        {/* Product Title on Image */}
        <View style={styles.titleOverlay}>
          <Text style={styles.productNameOverlay}>{product.name}</Text>
          <Text style={styles.productSubtitleOverlay}>{product.description}</Text>
        </View>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Text style={styles.starIcon}>★</Text>
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
      </View>

      {/* Content Card */}
      <View style={styles.contentCard}>
        <ScrollView 
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Cup Size */}
          <Text style={styles.sectionTitle}>Cup Size</Text>
          <View style={styles.optionsRow}>
            {product.sizes.map((size: string) => (
              <Button
                key={size}
                style={[
                  styles.optionButton,
                  selectedSize === size && styles.optionButtonActive,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedSize === size && styles.optionTextActive,
                  ]}
                >
                  {size}
                </Text>
              </Button>
            ))}
          </View>

          {/* Level Sugar */}
          <Text style={styles.sectionTitle}>Level Sugar</Text>
          <View style={styles.optionsRow}>
            {product.sugarLevels.map((level: string) => (
              <Button
                key={level}
                style={[
                  styles.optionButton,
                  selectedSugar === level && styles.optionButtonActive,
                ]}
                onPress={() => setSelectedSugar(level)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedSugar === level && styles.optionTextActive,
                  ]}
                >
                  {level}
                </Text>
              </Button>
            ))}
          </View>

          {/* About */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText} numberOfLines={showFullAbout ? undefined : 4}>
            {aboutText}
            {!showFullAbout && (
              <Text style={styles.readMoreText} onPress={() => setShowFullAbout(true)}> Read More</Text>
            )}
          </Text>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Add to Cart Button */}
        <View style={styles.buttonContainer}>
          <Button style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to cart</Text>
            <View style={styles.priceDivider} />
            <Text style={styles.addToCartText}>Rp {product.price.toLocaleString()}</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E2723',
  },
  imageSection: {
    height: height * 0.45,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2F4B26',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '300',
    marginTop: -2,
  },
  heartIcon: {
    fontSize: 20,
    color: '#fff',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 60,
    left: 20,
  },
  productNameOverlay: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  productSubtitleOverlay: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F4B26',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  starIcon: {
    fontSize: 14,
    color: '#FFD700',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 24,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    marginTop: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    marginTop: 0,
    width: 'auto',
  },
  optionButtonActive: {
    backgroundColor: '#2F4B26',
    borderColor: '#2F4B26',
  },
  optionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2F2D2C',
    textAlign: 'center',
  },
  optionTextActive: {
    color: '#fff',
  },
  aboutText: {
    fontSize: 13,
    color: '#9B9B9B',
    lineHeight: 22,
    marginBottom: 12,
  },
  readMoreText: {
    color: '#2F4B26',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  addToCartButton: {
    backgroundColor: '#2F4B26',
    paddingVertical: 18,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 16,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ProductDetailPage;
