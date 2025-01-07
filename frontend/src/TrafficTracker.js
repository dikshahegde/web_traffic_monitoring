import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './index.css';

const TrafficTracker = () => {
  const [url, setUrl] = useState('');
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io('http://localhost:5000');

    // Listen for traffic updates
    socket.on('trafficUpdate', (newData) => {
      setTrafficData((prevData) => [newData, ...prevData]); // Add new data to the top
    });

    // Cleanup on unmount
    return () => socket.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/addTraffic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    setUrl(''); // Clear input after submission
  };

  return (
    <div className="background">
      <h1>Real-Time Traffic Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Track URL</button>
      </form>
      <h2>Traffic Data</h2>
      <ul>
        {trafficData.map((item, index) => (
          <li key={index}>
            <strong>{item.url}</strong> - {item.ip} -{' '}
            {new Date(item.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficTracker;
