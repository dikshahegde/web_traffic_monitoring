require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load configuration from .env
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Connection
let db;
MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db(); // Use the database specified in the URI
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Add Traffic Endpoint
app.post('/api/addTraffic', (req, res) => {
  const { url } = req.body; // Extract the URL from the request body
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Get the user's IP address

  if (!url) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  const trafficData = {
    url,
    ip,
    timestamp: new Date(),
  };

  db.collection('trafficData')
    .insertOne(trafficData)
    .then(() => {
      res.status(201).json({ message: 'Traffic data added successfully.' });
    })
    .catch((err) => {
      console.error('Failed to add traffic data:', err);
      res.status(500).json({ error: 'Failed to save traffic data.' });
    });
});

// Fetch Traffic Endpoint
app.get('/api/getTraffic', (req, res) => {
  db.collection('trafficData')
    .find()
    .sort({ timestamp: -1 }) // Sort by latest timestamp
    .toArray()
    .then((trafficData) => {
      res.status(200).json(trafficData);
    })
    .catch((err) => {
      console.error('Failed to fetch traffic data:', err);
      res.status(500).json({ error: 'Failed to fetch traffic data.' });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
