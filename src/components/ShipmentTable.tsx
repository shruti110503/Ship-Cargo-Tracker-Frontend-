import { format } from 'date-fns';
import { MapPin, Package, Clock } from 'lucide-react';
import { Shipment } from '../types/shipment';

interface ShipmentTableProps {
  shipments: Shipment[];
  onSelectShipment: (shipment: Shipment) => void;
}

export default function ShipmentTable({ shipments, onSelectShipment }: ShipmentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Container ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ETA
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Package className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {shipment.containerId}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    {shipment.currentLocation.name}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    {format(new Date(shipment.eta), 'PPp')}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${shipment.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                    shipment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    shipment.status === 'delayed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {shipment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => onSelectShipment(shipment)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}