# ClassicDrive Vintage Cars Marketplace

This project has been restructured into a separate Frontend and Backend architecture.

## Structure

- **frontend/**: Contains the React application, Pages, Assets, CSS, and components.
- **backend/**: Contains the Node.js/Express API, controllers, models, and routes.

## Getting Started

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

## Database

The Backend is configured to use MongoDB. You will need to set up a `.env` file in the `backend/` directory with your `MONGODB_URI`.
Currently, the database connection code in `backend/server.js` is commented out as a placeholder. Uncomment it when you are ready to connect.
