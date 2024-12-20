import supabase from '@/lib/supabase';
import type { InsertTables } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useInsertOrderItems = () => {
  return useMutation({
    mutationFn: async (items: InsertTables<'order_items'>[]) => {
      const { error, data: newOrderItems } = await supabase.from('order_items').insert(items)
        .select();

      if (error) throw new Error(error.message);
      return newOrderItems;
    }
  });
};