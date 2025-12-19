import React, { useState } from 'react';
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
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import productsData from '../../data/products.json';

function SearchPage() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les produits selon la recherche
  const filteredProducts = productsData.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail' as never, { product } as never);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Button style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backIcon}>←</Text>
        </Button>
        <Text style={styles.headerTitle}>Rechercher</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher un café..."
          editable={true}
        />
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        {searchQuery.length > 0 && (
          <Text style={styles.resultsText}>
            {filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </Text>
        )}

        {searchQuery.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>☕</Text>
            <Text style={styles.emptyTitle}>Rechercher un café</Text>
            <Text style={styles.emptyDescription}>
              Tapez le nom d'un café, une catégorie{'\n'}ou une description pour commencer
            </Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>😔</Text>
            <Text style={styles.emptyTitle}>Aucun résultat</Text>
            <Text style={styles.emptyDescription}>
              Essayez de rechercher autre chose
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={require('../../../assets/images/home.png')}
                onPress={() => handleProductPress(item)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backIcon: {
    fontSize: 22,
    color: '#2F2D2C',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2F2D2C',
  },
  placeholder: {
    width: 44,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
    marginTop: 8,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  resultsText: {
    fontSize: 14,
    color: '#AEAEAE',
    marginBottom: 16,
    fontWeight: '500',
  },
  productRow: {
    justifyContent: 'space-between',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2F2D2C',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 15,
    color: '#AEAEAE',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
});

export default SearchPage;
