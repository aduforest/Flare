require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRoute = require('./api/users'); // Import the users route
const userRoute = require('./api/user'); // Import the single user route
const passwordRoute = require('./api/user/password');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Ensure your frontend URL is allowed
  credentials: true,
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Register /api/users route
app.use('/api/users', usersRoute);

// Register /api/user route
app.use('/api/user', userRoute);

app.use('/api/user/password', passwordRoute);

// Start server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
