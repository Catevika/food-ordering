import { useProductList } from '@/api/products';
import ProductListItem from '@/components/ProductListItem';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, Text } from 'react-native';

export default function MenuIndex() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) <ActivityIndicator />;
  if (error) return <Text>Failed to fetch products</Text>;

  return (
    <>
      <StatusBar style='auto' />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }} // Gap in row + padding around the whole flat list
        columnWrapperStyle={{ gap: 10 }} // Gap in column
      />
    </>
  );
}
