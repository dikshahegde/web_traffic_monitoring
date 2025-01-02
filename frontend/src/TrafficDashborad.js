import React, { useState } from 'react';

const TrafficDashboard = () => {
  const [url, setUrl] = useState('');
  const [trafficData, setTrafficData] = useState([]);

  const handleFetchTraffic = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/traffic/${url}`);
      const data = await response.json();
      setTrafficData(data);
    } catch (error) {
      console.error('Error fetching traffic data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleFetchTraffic}>Fetch Traffic</button>

      <h2>Traffic Data</h2>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>IP Address</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {trafficData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.url}</td>
              <td>{entry.ip}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrafficDashboard;
