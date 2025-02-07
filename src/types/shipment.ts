export interface Location {
  lat: number;
  lng: number;
  name: string;
  timestamp?: string;
}

export interface Shipment {
  id: string;
  containerId: string;
  route: Location[];
  currentLocation: Location;
  eta: string;
  status: 'in-transit' | 'delivered' | 'delayed' | 'pending';
  createdAt: string;
  updatedAt: string;
}