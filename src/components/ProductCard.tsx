// src/components/ProductCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const heartIcon = require('../../assets/images/Heart.png');
const heartFilledIcon = require('../../assets/images/Heart_remplie.png');

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
  onPress: () => void;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
  showFavorite?: boolean;
}

function ProductCard({ name, description, price, image, onPress, isFavorite = false, onFavoritePress, showFavorite = true }: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        {showFavorite && (
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={onFavoritePress}
          >
            <Image 
              source={isFavorite ? heartFilledIcon : heartIcon} 
              style={styles.heartIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            <Text style={styles.pricePrefix}>Rp</Text>
            {price.toLocaleString()}
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    backgroundColor: '#fff',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F2D2C',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F2D2C',
  },
  pricePrefix: {
    fontSize: 12,
    fontWeight: '400',
    color: '#2F2D2C',
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: '#2F4B26',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  heartIcon: {
    width: 16,
    height: 16,
  },
});

export default ProductCard;
