# Cargo Shipment Tracker

A full-stack application for tracking cargo shipments in real-time. The application allows users to view shipment details, track current locations on an interactive map, and manage shipment status.

## Features

- Real-time shipment tracking
- Interactive map visualization using react-leaflet
- Shipment status management
- Create new shipments
- Update shipment locations
- View estimated arrival times
- Responsive design

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- React Leaflet for maps
- Axios for API requests
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- CORS for cross-origin resource sharing
- Environment variables with dotenv

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/cargo-tracker
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Shipments

- `GET /api/shipments` - Get all shipments
- `GET /api/shipments/:id` - Get a specific shipment
- `POST /api/shipments` - Create a new shipment
- `POST /api/shipments/:id/update-location` - Update shipment location
- `GET /api/shipments/:id/eta` - Get shipment ETA

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.