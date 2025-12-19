// src/components/SearchBar.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './Button';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
  placeholder?: string;
  editable?: boolean;
  onFilterPress?: () => void;
}

function SearchBar({ value, onChangeText, onPress, placeholder = 'Search Coffee ...', editable = true, onFilterPress }: SearchBarProps) {
  if (!editable && onPress) {
    // Mode non-éditable (pour rediriger vers une page de recherche)
    return (
      <Button style={styles.searchBar} onPress={onPress}>
        <Icon name="search-outline" size={22} color="#2F4B26" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>{placeholder}</Text>
        {onFilterPress && (
          <Image 
            source={require('../../assets/images/filter.png')} 
            style={styles.filterImage}
            resizeMode="contain"
          />
        )}
      </Button>
    );
  }

  return (
    <View style={styles.searchBar}>
      <Icon name="search-outline" size={22} color="#2F4B26" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
      {value.length > 0 ? (
        <Button style={styles.clearButton} onPress={() => onChangeText('')}>
          <Icon name="close-circle" size={20} color="#9CA3AF" />
        </Button>
      ) : (
        <Image 
          source={require('../../assets/images/filter.png')} 
          style={styles.filterImage}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    height: 50,
    marginTop: 0,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#2F2D2C',
    fontWeight: '400',
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  clearButton: {
    width: 36,
    height: 36,
    backgroundColor: 'transparent',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginTop: 0,
  },
  filterImage: {
    width: 22,
    height: 22,
    tintColor: '#2F4B26',
  },
});

export default SearchBar;
