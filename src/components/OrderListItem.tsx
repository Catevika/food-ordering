import daysjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link, useSegments } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Order } from 'types';

type OrderListItemProps = {
  order: Order;
};

daysjs.extend(relativeTime);

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>{daysjs(order.created_at).fromNow().charAt(0).toUpperCase() + daysjs(order.created_at).fromNow().slice(1)}</Text>
        </View>
        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
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
});

export default OrderListItem;
