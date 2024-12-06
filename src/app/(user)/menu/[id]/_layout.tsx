import { useProduct } from '@/api/products';
import Button from '@/components/Button';
import { defaultPizzaImageUri } from '@/components/ProductListItem';
import { useCart } from '@/providers/CartProvider';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { PizzaSize } from 'types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const productDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  const [selectedSize, setSelectedSize] = useState<PizzaSize>(sizes[1].toString() as PizzaSize);

  const { addItem } = useCart();
  const router = useRouter();

  const addToCart = () => {
    if (!product) {
      return;
    } else {
      addItem(product, selectedSize);
    }
    router.push('/cart');
  };

  if (isLoading) <ActivityIndicator />;
  if (error) return <Text>Failed to fetch product {id}</Text>;
  if (!product) return <Text>Product not found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImageUri }} style={styles.image} />
      <Text>Select size:</Text>
      <View style={styles.sizes}>
        {sizes.map(size => (
          <Pressable key={size} style={[styles.size, { backgroundColor: selectedSize === size ? 'gainsboro' : '#fff' }]} onPress={() => setSelectedSize(size)}>
            <Text style={[styles.sizeText, { color: selectedSize === size ? 'black' : 'gray' }]}>
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Button text="Add to cart" onPress={addToCart} />
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
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
  backToMenu: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default productDetailsScreen;
