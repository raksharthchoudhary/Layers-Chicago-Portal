require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/database'); // Import the connectDB function

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200
}));

// Middleware
app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use secure: true in production with HTTPS
}));

// MongoDB credentials stored as environment variables
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

// Endpoint to connect to MongoDB using stored credentials
app.post('/login', async (req, res) => {
  try {
    // Connect to MongoDB using the stored credentials
    await connectDB(MONGO_USERNAME, MONGO_PASSWORD);
    res.status(200).json({ message: 'User logged in and connected to MongoDB successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to login or connect to MongoDB', error: err.message });
  }
});

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/profileRoutes'));
app.use('/api', require('./routes/inventoryItems'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;