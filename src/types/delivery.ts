export interface Delivery {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  items: DeliveryItem[];
  status: DeliveryStatus;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  scheduledDate: string;
  deliveredAt?: string;
  notes?: string;
  signature?: string;
}

export interface DeliveryItem {
  id: string;
  itemId: string;
  name: string;
  quantity: number;
}

export type DeliveryStatus = 
  | 'pending'
  | 'in_transit'
  | 'delivered'
  | 'failed'
  | 'returned';

// Mock data
export const MOCK_DELIVERIES: Delivery[] = [
  {
    id: '1',
    orderId: 'ORD001',
    customerId: 'CUST001',
    customerName: 'John Doe',
    customerAddress: '123 Main St, City',
    customerPhone: '555-0123',
    items: [
      {
        id: '1',
        itemId: '1',
        name: 'Premium Headphones',
        quantity: 1
      }
    ],
    status: 'pending',
    assignedTo: '2', // Driver's ID
    priority: 'high',
    scheduledDate: new Date().toISOString(),
  }
];