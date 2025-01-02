// TrafficTable.js
import React, { useEffect, useState } from 'react';

const TrafficTable = () => {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    // Fetch traffic data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/traffic');
        const data = await response.json();
        setTrafficData(data); // Store traffic data
      } catch (error) {
        console.error('Error fetching traffic data:', error);
      }
    };

    fetchData();
  }, []); // Empty array ensures this effect runs only once when the component mounts

  return (
    <div>
      <h3>Traffic Data</h3>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>IP Address</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {trafficData.map((entry) => (
            <tr key={entry._id}>
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

export default TrafficTable;
