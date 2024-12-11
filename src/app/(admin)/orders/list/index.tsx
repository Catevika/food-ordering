import { useAdminOrderList } from '@/api/orders';
import { useInsertOrderSubscription } from '@/api/orders/subscriptions';
import OrderListItem from '@/components/OrderListItem';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, Platform, Text } from 'react-native';

export default function OrderAdminScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch orders</Text>;
  }

  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
}
