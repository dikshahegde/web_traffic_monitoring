const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
let db;
MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db('backendDB'); // Replace 'backendDB' with your database name
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

// API Routes
app.post('/api/addData', (req, res) => {
  const { url, time } = req.body;
  const ip = req.ip;

  if (!url || !time) {
    return res.status(400).json({ error: 'URL and time are required.' });
  }

  const data = { url, ip, time };
  db.collection('dataCollection')
    .insertOne(data)
    .then((result) => {
      res.status(201).json({ message: 'Data added successfully', data: result.ops[0] });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to add data to the database.' });
    });
});

app.get('/api/data', (req, res) => {
  db.collection('dataCollection')
    .find()
    .toArray()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: 'Failed to fetch data.' }));
});

// Optional: Serve static frontend (if you have a `public` folder with an `index.html` file)
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
