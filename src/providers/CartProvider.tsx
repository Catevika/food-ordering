import { useInsertOrderItems } from '@/api/order-items';
import { useInsertOrder } from '@/api/orders';
import type { CartItem, Tables } from '@/types';
import { randomUUID } from 'expo-crypto';
import { useRouter, type ExternalPathString } from 'expo-router';
import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type CartType = {
  items: CartItem[];
  addItem: (product: Tables<'products'>, size: CartItem['size']) => void;
  updateQuantity: (id: string, quantity: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => { },
  updateQuantity: () => { },
  total: 0,
  checkout: () => { },
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();

  const router = useRouter();

  const addItem = (product: Tables<'products'>, size: CartItem['size']) => {
    const existingItem = items.find(item => item.product_id === product.id && item.size === size);

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = { id: randomUUID(), product, product_id: product.id, size, quantity: 1 };
    setItems(prevItems => [...prevItems, newCartItem]);
  };

  const updateQuantity = (id: string, quantity: -1 | 1) => {
    setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, quantity: item.quantity + quantity } : item).filter(item => item.quantity > 0));
  };

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const clearCart = () => setItems([]);

  const saveOrderItems = (order: Tables<'orders'>) => {
    const orderUrl = `/(user)/orders/${order.id.toString()}` as ExternalPathString;

    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      size: cartItem.size,
      quantity: cartItem.quantity,
    }));

    insertOrderItems(
      orderItems, {
      onSuccess: () => {
        clearCart();
        router.push(orderUrl);
      },
      onError: (error) => {
        console.error('Error saving order items:', error);
      }
    });
  };

  const checkout = () => {
    console.warn('Checkout is pressed');
    insertOrder({ total }, {
      onSuccess: saveOrderItems
    });
  };

  const contextValue = useMemo(() => ({ items, addItem, updateQuantity, total, checkout }), [items]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  return useContext(CartContext);
};