import { Database } from './database.types';

// Helpers for supabase-js to shorten types, ex: Tables<'products'>
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string | null;
};


export type ModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  animation: 'none' | 'slide' | 'fade' | undefined;
  title: string;
  message: string;
  textStyle1: StyleProp<TextStyle> | ((state: PressableStateCallbackType) => StyleProp<TextStyle>);
  textStyle2: StyleProp<TextStyle> | ((state: PressableStateCallbackType) => StyleProp<TextStyle>) | undefined;
  buttonStyle1: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  buttonStyle2: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) | undefined;
  buttonText1: string;
  buttonText2: string | null;
  action1: () => void;
  action2: () => void;
};
