import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { createShipment } from '../store/shipmentsSlice';
import { Package, Plus, X } from 'lucide-react';

interface CreateShipmentFormProps {
  onClose: () => void;
}

export default function CreateShipmentForm({ onClose }: CreateShipmentFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    containerId: '',
    route: [
      { lat: 0, lng: 0, name: '' }
    ],
    currentLocation: { lat: 0, lng: 0, name: '' },
    eta: '',
    status: 'pending' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createShipment(formData)).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to create shipment:', error);
    }
  };

  const addRoutePoint = () => {
    setFormData(prev => ({
      ...prev,
      route: [...prev.route, { lat: 0, lng: 0, name: '' }]
    }));
  };

  const updateRoutePoint = (index: number, field: keyof typeof formData.route[0], value: string) => {
    setFormData(prev => ({
      ...prev,
      route: prev.route.map((point, i) => 
        i === index ? { ...point, [field]: field === 'name' ? value : Number(value) } : point
      )
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6" />
            Create New Shipment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Container ID
            </label>
            <input
              type="text"
              required
              value={formData.containerId}
              onChange={(e) => setFormData(prev => ({ ...prev, containerId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Route Points
              </label>
              <button
                type="button"
                onClick={addRoutePoint}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Point
              </button>
            </div>
            <div className="space-y-4">
              {formData.route.map((point, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    placeholder="Latitude"
                    required
                    value={point.lat || ''}
                    onChange={(e) => updateRoutePoint(index, 'lat', e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Longitude"
                    required
                    value={point.lng || ''}
                    onChange={(e) => updateRoutePoint(index, 'lng', e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Location Name"
                    required
                    value={point.name}
                    onChange={(e) => updateRoutePoint(index, 'name', e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Location
            </label>
            <div className="grid grid-cols-3 gap-4 mt-1">
              <input
                type="number"
                placeholder="Latitude"
                required
                value={formData.currentLocation.lat || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  currentLocation: { ...prev.currentLocation, lat: Number(e.target.value) }
                }))}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="number"
                placeholder="Longitude"
                required
                value={formData.currentLocation.lng || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  currentLocation: { ...prev.currentLocation, lng: Number(e.target.value) }
                }))}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Location Name"
                required
                value={formData.currentLocation.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  currentLocation: { ...prev.currentLocation, name: e.target.value }
                }))}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ETA
            </label>
            <input
              type="datetime-local"
              required
              value={formData.eta}
              onChange={(e) => setFormData(prev => ({ ...prev, eta: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                status: e.target.value as 'pending' | 'in-transit' | 'delivered' | 'delayed'
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create Shipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}