import Button from '@/components/Button';
import CartListItem from '@/components/CartListItem';
import Colors from '@/constants/Colors';
import { useCart } from '@/providers/CartProvider';
import { Link } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";

export default function CartScreen() {
  const { items, total } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <View style={styles.backToMenu}>
        <Link style={styles.link} href="/menu">Add a pizza</Link>
      </View>
      <Text style={styles.text}>Total: ${total.toFixed(2)}</Text>
      <Button text="Checkout" />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '500',
  },
  backToMenu: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  link: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.tint,
  }
});
