import orders from '@/assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native';

export default function MenuIndex() {
  return (
    <>
      <StatusBar style='auto' />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
}
