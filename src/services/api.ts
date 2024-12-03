import { InventoryItem, MOCK_INVENTORY } from '../types/inventory';
import { Delivery, MOCK_DELIVERIES } from '../types/delivery';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Inventory
  async getInventory(): Promise<InventoryItem[]> {
    await delay(1000);
    return MOCK_INVENTORY;
  },

  async updateInventoryItem(item: InventoryItem): Promise<InventoryItem> {
    await delay(1000);
    const index = MOCK_INVENTORY.findIndex(i => i.id === item.id);
    if (index === -1) throw new Error('Item not found');
    MOCK_INVENTORY[index] = item;
    return item;
  },

  async addInventoryItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    await delay(1000);
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
      lastUpdated: new Date().toISOString()
    };
    MOCK_INVENTORY.push(newItem);
    return newItem;
  },

  // Deliveries
  async getDeliveries(): Promise<Delivery[]> {
    await delay(1000);
    return MOCK_DELIVERIES;
  },

  async updateDeliveryStatus(
    id: string,
    status: Delivery['status'],
    details?: Partial<Delivery>
  ): Promise<Delivery> {
    await delay(1000);
    const delivery = MOCK_DELIVERIES.find(d => d.id === id);
    if (!delivery) throw new Error('Delivery not found');
    
    Object.assign(delivery, {
      status,
      ...details,
      ...(status === 'delivered' ? { deliveredAt: new Date().toISOString() } : {})
    });
    
    return delivery;
  }
};