// /frontend/src/TrafficTracker.js
import React, { useState } from 'react';

const TrafficTracker = () => {
  const [url, setUrl] = useState('');
  const [trafficData, setTrafficData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log the URL before sending the request
    console.log('Submitting URL:', url);

    const response = await fetch('http://localhost:5000/api/addTraffic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    
    if (response.ok) {
      alert('Traffic logged successfully');
    } else {
      alert('Error logging traffic');
    }
  };

  const getTrafficData = async () => {
    console.log('Fetching traffic data...');
    
    const response = await fetch('http://localhost:5000/api/getTraffic');
    const data = await response.json();
    
    console.log('Traffic data fetched:', data);  // Log traffic data

    setTrafficData(data);
  };

  return (
    <div>
      <h1>Traffic Tracker</h1>

      {/* Form to log traffic */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Track URL</button>
      </form>

      {/* Button to get traffic data */}
      <button onClick={getTrafficData}>Get Traffic Data</button>

      {/* Display traffic data */}
      <h2>Traffic Data</h2>
      <ul>
        {trafficData.map((item, index) => (
          <li key={index}>
            <strong>{item.url}</strong> - {item.ip} - {new Date(item.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficTracker;
