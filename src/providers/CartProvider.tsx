import type { Tables } from '@/database.types';
import { randomUUID } from 'expo-crypto';
import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import type { CartItem } from 'types';

type CartType = {
  items: CartItem[];
  addItem: (product: Tables<'products'>, size: CartItem['size']) => void;
  updateQuantity: (id: string, quantity: -1 | 1) => void;
  total: number;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => { },
  updateQuantity: () => { },
  total: 0
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

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

  const contextValue = useMemo(() => ({ items, addItem, updateQuantity, total }), [items]);

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