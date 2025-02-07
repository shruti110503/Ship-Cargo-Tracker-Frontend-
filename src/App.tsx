import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchShipments } from './store/shipmentsSlice';
import ShipmentTable from './components/ShipmentTable';
import ShipmentMap from './components/ShipmentMap';
import CreateShipmentForm from './components/CreateShipmentForm';
import { Shipment } from './types/shipment';
import { Package, Plus } from 'lucide-react';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: shipments, status, error } = useSelector((state: RootState) => state.shipments);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchShipments());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Cargo Tracker
              </span>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Shipment
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Shipments Overview</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage your cargo shipments in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {selectedShipment && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Shipment Details - {selectedShipment.containerId}
                </h2>
                <ShipmentMap shipment={selectedShipment} />
              </div>
            )}

            <div className="bg-white rounded-lg shadow">
              <ShipmentTable
                shipments={shipments}
                onSelectShipment={setSelectedShipment}
              />
            </div>
          </div>
        </div>
      </main>

      {showCreateForm && (
        <CreateShipmentForm onClose={() => setShowCreateForm(false)} />
      )}
    </div>
  );
}

export default App;