import products from '@/assets/data/products';
import { defaultPizzaImageUri } from '@/components/ProductListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, View } from "react-native";

const productDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return (
      <View>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImageUri }} style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToMenu: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default productDetailsScreen;
