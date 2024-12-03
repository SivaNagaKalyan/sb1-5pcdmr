import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { InventoryItem } from '../types/inventory';

export function useInventory() {
  const queryClient = useQueryClient();

  const inventory = useQuery({
    queryKey: ['inventory'],
    queryFn: api.getInventory
  });

  const addItem = useMutation({
    mutationFn: api.addInventoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    }
  });

  const updateItem = useMutation({
    mutationFn: api.updateInventoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    }
  });

  return {
    inventory,
    addItem,
    updateItem
  };
}