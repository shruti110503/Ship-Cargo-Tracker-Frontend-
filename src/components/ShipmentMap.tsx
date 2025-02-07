import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Shipment } from '../types/shipment';
import { Truck } from 'lucide-react';

interface ShipmentMapProps {
  shipment: Shipment;
}

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ShipmentMap({ shipment }: ShipmentMapProps) {
  const positions = shipment.route.map((loc) => [loc.lat, loc.lng]);
  const center = [
    shipment.currentLocation.lat,
    shipment.currentLocation.lng,
  ] as [number, number];

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} icon={customIcon}>
          <Popup>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Current Location: {shipment.currentLocation.name}</span>
            </div>
          </Popup>
        </Marker>
        <Polyline positions={positions} color="blue" />
      </MapContainer>
    </div>
  );
}