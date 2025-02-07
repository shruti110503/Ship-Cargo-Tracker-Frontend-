import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Shipment } from '../types/shipment';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchShipments = createAsyncThunk(
  'shipments/fetchShipments',
  async () => {
    const response = await axios.get(`${API_URL}/shipments`);
    return response.data;
  }
);

export const createShipment = createAsyncThunk(
  'shipments/createShipment',
  async (shipmentData: Omit<Shipment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post(`${API_URL}/shipments`, shipmentData);
    return response.data;
  }
);

export const updateShipmentLocation = createAsyncThunk(
  'shipments/updateLocation',
  async ({ id, location }: { id: string; location: { lat: number; lng: number; name: string } }) => {
    const response = await axios.post(`${API_URL}/shipments/${id}/update-location`, { location });
    return response.data;
  }
);

interface ShipmentsState {
  items: Shipment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShipmentsState = {
  items: [],
  status: 'idle',
  error: null,
};

const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch shipments';
      })
      .addCase(createShipment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateShipmentLocation.fulfilled, (state, action) => {
        const index = state.items.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default shipmentsSlice.reducer;