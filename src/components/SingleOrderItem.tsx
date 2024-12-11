import type { Tables } from '@/types';
import daysjs from 'dayjs';
import { StyleSheet, Text, View } from "react-native";
type OrderItemProps = {
  order: Tables<'orders'>;
};
const SingleOrderItem = ({ order }: OrderItemProps) => {

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.title}>Order #{order.id}</Text>
        <Text style={styles.time}>{daysjs((order.created_at)).toNow().charAt(0).toUpperCase() + daysjs((order.created_at)).toNow().slice(1)}</Text>
      </View>
      <Text style={styles.status}>{order.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
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

export default SingleOrderItem;
