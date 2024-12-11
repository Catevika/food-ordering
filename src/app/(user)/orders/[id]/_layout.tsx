import { useOrderDetails } from '@/api/orders';
import OrderItemListItem from '@/components/OrderItemListItem';
import SingleOrderItem from '@/components/SingleOrderItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Text } from "react-native";

const OrderProfileDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Failed to fetch order</Text>;
  if (!order) return <Text>Order not found</Text>;

  return (
    <>
      <Stack.Screen options={{ title: 'Order #' + order.id }} />
      <SingleOrderItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10, paddingInline: 20 }}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
};

export default OrderProfileDetailsScreen;