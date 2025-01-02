// Dashboard.js
import React, { useState } from 'react';
import TrafficForm from './trafficForm';
import TrafficTable from './TrafficTable';

const Dashboard = () => {
  const [refreshData, setRefreshData] = useState(false);

  const handleSubmit = async (url) => {
    // Send the URL data to the backend
    try {
      await fetch('http://localhost:5000/api/traffic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      // After submitting, trigger a re-fetch of the traffic data
      setRefreshData(!refreshData);
    } catch (error) {
      console.error('Error submitting traffic data:', error);
    }
  };

  return (
    <div>
      <h2>Traffic Dashboard</h2>
      <TrafficForm onSubmit={handleSubmit} />
      <TrafficTable key={refreshData} />
    </div>
  );
};

export default Dashboard;
