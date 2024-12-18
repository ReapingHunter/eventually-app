import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/user.route.js';
import eventRoutes from './src/routes/event.route.js';
import rsvpRoutes from './src/routes/rsvp.route.js'
import categoryRoutes from './src/routes/category.route.js'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import './tasks/cron.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Get the current directory from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());
app.use(cors({
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

// Serve static files (images)
const imageDirectory = path.join(__dirname, 'images');
app.use('/images', express.static(imageDirectory));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/categories', categoryRoutes)
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});