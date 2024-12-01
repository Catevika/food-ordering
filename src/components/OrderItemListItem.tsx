import Colors from '@/constants/Colors';
import { Image, StyleSheet, Text, View } from "react-native";
import type { OrderItem } from 'types';

const OrderItemListItem = ({ order }: { order: OrderItem; }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: order.products.image }} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{order.products.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.price}>${order.products.price}</Text>
          <Text style={styles.time}>Size: {order.size}</Text>
        </View>
      </View>
      <Text style={styles.status}>{order.quantity}</Text>
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
