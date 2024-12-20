import { useProduct } from '@/api/products';
import { defaultPizzaImageUri } from '@/components/ProductListItem';
import RemoteImage from '@/components/RemoteImage';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

const productDetailsScreen = () => {
  const router = useRouter();
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  if (isLoading) <ActivityIndicator />;
  if (error) return <Text>Failed to fetch product {id}</Text>;
  if (!product) return <Text>Product not found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: 'Menu', headerRight: () => (
          <Pressable onPressIn={() => router.push(`/(admin)/menu/create?id=${product.id}`)}>
            {({ pressed }) => (
              <FontAwesome
                name="pencil"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        ),
      }} />
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage path={product.image} fallback={defaultPizzaImageUri} style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToMenu: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default productDetailsScreen;
