import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/user.route.js'
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Route for the root API
app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

// Used for running different ports
app.use(cors());

// User routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});