import { orders, orderStatusList } from '@/assets/data/orders';
import OrderItemListItem from '@/components/OrderItemListItem';
import SingleOrderItem from '@/components/SingleOrderItem';
import Colors from '@/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, Pressable, Text, View } from "react-native";

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
        ListFooterComponent={() => (<>
          <Text style={{ fontWeight: 'bold' }}>Status</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {orderStatusList.map((status) => (
              <Pressable
                key={status}
                onPress={() => console.warn('Update status')}
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

export default orderDetailsScreen;
