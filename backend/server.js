require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const usersRoute = require('./api/users');
const userRoute = require('./api/user');
const authRoute = require('./api/auth');
const passwordRoute = require('./api/user/password');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Ensure your frontend URL is allowed
  credentials: true,
}));
app.use(express.json());

// Session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Register routes
app.use('/api/users', usersRoute);
app.use('/api/user', userRoute);
app.use('/api/user/password', passwordRoute);
app.use('/api/auth', authRoute);

// Start server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

