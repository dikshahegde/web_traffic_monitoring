import React, { useState, useEffect } from 'react';

const TrafficDashboard = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [trafficData, setTrafficData] = useState([]);

  // Fetch traffic data from the backend
  const fetchTraffic = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getTraffic');
      if (response.ok) {
        const data = await response.json();
        setTrafficData(data);
      } else {
        alert('Failed to fetch traffic data.');
      }
    } catch (err) {
      console.error('Error fetching traffic data:', err);
      alert('An error occurred while fetching traffic data.');
    }
  };

  // Add traffic to the backend
  const handleAddTraffic = async () => {
    if (!inputUrl) {
      alert('Please enter a valid URL.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/addTraffic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Notify user of success
        setInputUrl(''); // Clear input field
        fetchTraffic(); // Refresh traffic data
      } else {
        const errorData = await response.json();
        alert(`Failed to add traffic: ${errorData.error}`);
      }
    } catch (err) {
      console.error('Error adding traffic:', err);
      alert('An error occurred while adding traffic.');
    }
  };

  // Fetch traffic data on component mount
  useEffect(() => {
    fetchTraffic();
  }, []);

  return (
    <div>
      <h1>Real-Time Web Traffic Monitoring</h1>
      <h2>Traffic Dashboard</h2>
      <input
        type="text"
        placeholder="Enter URL"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      <button onClick={handleAddTraffic}>Add Traffic</button>
      <button onClick={fetchTraffic}>Fetch Traffic</button>

      <ul>
        {trafficData.map((traffic, index) => (
          <li key={index}>
            {traffic.url} - {traffic.ip} - {new Date(traffic.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficDashboard;
