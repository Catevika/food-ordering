import RemoteImage from '@/components/RemoteImage';
import Colors from '@/constants/Colors';
import { Tables } from '@/types';
import { Link, useSegments, type ExternalPathString } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

export const defaultPizzaImageUri = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Tables<'products'>;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();
  const productUrl = `/${segments[0]}/menu/${product.id.toString()}` as ExternalPathString;

  return (
    <Link href={productUrl} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImageUri}
          alt={product.name}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </Pressable>
    </Link>
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