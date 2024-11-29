import products from '@/assets/data/products';
import Button from '@/components/Button';
import { defaultPizzaImageUri } from '@/components/ProductListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const sizes = ['S', 'M', 'L', 'XL'];
const productDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const [selectedSize, setSelectedSize] = useState(sizes[1]);

  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return (
      <View>
        <Text>Product not found</Text>
      </View>
    );
  }

  const addToCart = () => {
    console.warn('Adding to cart', 'size: ' + selectedSize);
  };

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
      <Text style={styles.price}>${product.price}</Text>
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
  }
});

export default productDetailsScreen;
