import supabase from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import type { InsertTables, UpdateTables } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
export const useAdminOrderList = ({ archived = false }) => {
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

  return useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase.from('orders').select('*').in('status', statuses).order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useProfileOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  if (!id) throw new Error('No user id');


  return useQuery({
    queryKey: ['orders', { userId: id }],
    queryFn: async () => {
      if (!id) throw new Error('No user id');
      const { data, error } = await supabase.from('orders').select('*').eq('user_id', id).order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    mutationFn: async (data: InsertTables<'orders'>) => {
      const { error, data: newOrder } = await supabase.from('orders').insert({ ...data, user_id: userId })
        .select().single();

      if (error) throw new Error(error.message);
      return newOrder;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });
};

export const useUpdateOrder = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateTables<'orders'>) => {
      const { error, data: updatedOrder } = await supabase.from('orders').update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return updatedOrder;
    },
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['orders', id] });
    }
  });
};