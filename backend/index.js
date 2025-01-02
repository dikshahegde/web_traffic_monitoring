const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Traffic = require('./models/Traffic');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Routes
app.get('/', (req, res) => res.send('Backend is running!'));

// Add traffic data
app.post('/api/addTraffic', async (req, res) => {
  const { url } = req.body;
  const ip = req.ip;
  if (!url) return res.status(400).json({ error: 'URL is required.' });

  try {
    const newTraffic = new Traffic({ url, ip });
    await newTraffic.save();
    res.status(201).json({ message: 'Traffic data saved', data: newTraffic });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save traffic data.' });
  }
});

// Get all traffic data
app.get('/api/traffic', async (req, res) => {
  try {
    const trafficData = await Traffic.find();
    res.json(trafficData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch traffic data.' });
  }
});

// Get traffic data for a specific URL
app.get('/api/traffic/:url', async (req, res) => {
  const { url } = req.params;
  try {
    const trafficData = await Traffic.find({ url });
    res.json(trafficData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch traffic data for the URL.' });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
