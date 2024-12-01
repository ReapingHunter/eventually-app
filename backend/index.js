import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/user.route.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/api/users', userRoutes); // User routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});