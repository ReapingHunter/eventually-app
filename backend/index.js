import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/user.route.js';
import cors from 'cors';
import eventRoutes from './src/routes/event.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Get the current directory from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());

// Serve static files (images) from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route for the root API
app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

// CORS middleware
app.use(cors({
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

// User routes
app.use('/api/users', userRoutes);

// Event routes
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
