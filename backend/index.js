const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = 'mongodb://127.0.0.1:27017'; // MongoDB connection URI
const client = new MongoClient(uri);

let db;
client.connect()
  .then(() => {
    db = client.db('webTrafficDB');
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Add Traffic Endpoint
app.post('/api/addTraffic', (req, res) => {
  const { url } = req.body; // Extract the URL from the request body
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Get IP address

  if (!url) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  const trafficData = {
    url,
    ip: ip === '::1' ? 'localhost' : ip, // Handle localhost case
    timestamp: new Date(),
  };

  db.collection('trafficData')
    .insertOne(trafficData)
    .then(() => {
      res.status(201).json({ message: 'Traffic data added successfully.' });
    })
    .catch(err => {
      console.error('Failed to add traffic data:', err);
      res.status(500).json({ error: 'Failed to save traffic data.' });
    });
});

// Fetch Traffic Endpoint
app.get('/api/getTraffic', (req, res) => {
  const { url } = req.query; // Extract the URL from the query parameters

  if (!url) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  db.collection('trafficData')
    .find({ url }) // Filter traffic by URL
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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
