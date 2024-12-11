import { defaultPizzaImageUri } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import type { Tables } from '@/types';
import { Image, StyleSheet, Text, View } from "react-native";

type OrderItemListItemProps = {
  item: Tables<'order_items'> & { products: Tables<'products'> | null; };
};
const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.products?.image || defaultPizzaImageUri }} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item?.products?.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.price}>${item?.products?.price}</Text>
          <Text style={styles.time}>Size: {item.size}</Text>
        </View>
      </View>
      <Text style={styles.status}>{item.quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginRight: 'auto'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
    color: 'gray'
  },
  status: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '25%',
    aspectRatio: 1,
    marginRight: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default OrderItemListItem;
