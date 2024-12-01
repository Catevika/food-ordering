import orders from '@/assets/data/orders';
import OrderItemListItem from '@/components/OrderItemListItem';
import SingleOrderItem from '@/components/SingleOrderItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View } from "react-native";

const orderDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const order = orders.find(o => o.id.toString() === id);

  if (!order || !order.order_items) {
    return (
      <View>
        <Text>Order not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Order #' + order.id }} />
      <SingleOrderItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem order={item} />}
        contentContainerStyle={{ gap: 10, paddingInline: 20 }}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
};

export default orderDetailsScreen;
