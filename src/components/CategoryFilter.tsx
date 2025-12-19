// src/components/CategoryFilter.tsx
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const cafeIcon = require('../../assets/images/cafe.png');

function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.categoryButtonActive,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Image 
            source={cafeIcon} 
            style={[
              styles.categoryIcon,
              selectedCategory === category && styles.categoryIconActive,
            ]} 
            resizeMode="contain"
          />
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  categoryButtonActive: {
    backgroundColor: '#2F4B26',
    borderColor: '#2F4B26',
  },
  categoryIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    tintColor: '#2F4B26',
  },
  categoryIconActive: {
    tintColor: '#FFFFFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#2F2D2C',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
});

export default CategoryFilter;
