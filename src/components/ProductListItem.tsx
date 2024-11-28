import Colors from '@/constants/Colors';

import { Image, StyleSheet, Text, View } from 'react-native';
import type { Product } from 'types';

export const defaultPizzaImageUri = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/pizza.png';
type ProductListItemProps = {
  product: Product;
};
const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={{ uri: product?.image || defaultPizzaImageUri }}
          alt={product?.name}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    flex: 1, // split equally the space between siblings
    maxWidth: '50%', // to be sure that if the number of product is odd, the last product will occupy only 1 column
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});

export default ProductListItem;