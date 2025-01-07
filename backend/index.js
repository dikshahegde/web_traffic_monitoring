const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET', 'POST'],
  },
});

const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection


let db;
const MONGO_URI = process.env.MONGO_URI;
console.log('MongoDB URI:', MONGO_URI);

MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db();
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Add Traffic Endpoint
app.post('/api/addTraffic', (req, res) => {
  const { url } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (!url) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  const trafficData = { url, ip, timestamp: new Date() };

  db.collection('trafficData')
    .insertOne(trafficData)
    .then(() => {
      io.emit('trafficUpdate', trafficData); // Emit update to all clients
      res.status(201).json({ message: 'Traffic data added successfully.' });
    })
    .catch(err => {
      console.error('Failed to add traffic data:', err);
      res.status(500).json({ error: 'Failed to save traffic data.' });
    });
});

// Fetch Traffic Data
app.get('/api/getTraffic', (req, res) => {
  db.collection('trafficData')
    .find()
    .sort({ timestamp: -1 })
    .toArray()
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.error('Failed to fetch traffic data:', err);
      res.status(500).json({ error: 'Failed to fetch traffic data.' });
    });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
