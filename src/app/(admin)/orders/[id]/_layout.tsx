import { useOrderDetails, useUpdateOrder } from '@/api/orders';
import { orderStatusList } from '@/assets/data/orders';
import OrderItemListItem from '@/components/OrderItemListItem';
import SingleOrderItem from '@/components/SingleOrderItem';
import Colors from '@/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";

const OrderAdminDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  const { mutate: updateOrder } = useUpdateOrder(id);

  const updateStatus = (status: string) => {
    updateOrder({ status });
  };

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
        ListFooterComponent={() => (<>
          <Text style={{ fontWeight: 'bold' }}>Status</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {orderStatusList.map((status) => (
              <Pressable
                key={status}
                onPress={() => updateStatus(status)}
                style={{
                  borderColor: Colors.light.tint,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 5,
                  backgroundColor:
                    order.status === status
                      ? Colors.light.tint
                      : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color:
                      order.status === status ? 'white' : Colors.light.tint,
                  }}
                >
                  {status}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
        )}
      />
    </>
  );
};

export default OrderAdminDetailsScreen;
