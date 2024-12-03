import { useState } from 'react';
import { useDeliveries } from '../../hooks/useDeliveries';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { generateDeliveryReport } from '../../utils/reports';
import { FileDown, CheckCircle, XCircle } from 'lucide-react';

export function DeliveryPage() {
  const { user } = useAuth();
  const { deliveries, updateStatus } = useDeliveries();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredDeliveries = deliveries.data?.filter(delivery => {
    const isAssigned = delivery.assignedTo === user?.id;
    const matchesDate = delivery.scheduledDate.startsWith(selectedDate);
    return isAssigned && matchesDate;
  });

  const handleStatusUpdate = async (id: string, status: 'delivered' | 'failed') => {
    await updateStatus.mutateAsync({
      id,
      status,
      details: {
        deliveredAt: status === 'delivered' ? new Date().toISOString() : undefined
      }
    });
  };

  const handleExport = () => {
    if (deliveries.data) {
      generateDeliveryReport(deliveries.data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Deliveries</h1>
        <Button onClick={handleExport}>
          <FileDown className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeliveries?.map((delivery) => (
                <tr key={delivery.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {delivery.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{delivery.customerName}</div>
                    <div className="text-sm text-gray-500">{delivery.customerPhone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {delivery.customerAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${delivery.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        delivery.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {delivery.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {delivery.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(delivery.id, 'delivered')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Delivered
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleStatusUpdate(delivery.id, 'failed')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Failed
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}