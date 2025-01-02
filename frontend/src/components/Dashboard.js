import React, { useEffect, useState } from 'react';
import TrafficTable from './TrafficTable';

const Dash = () => {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/traffic');
      const data = await response.json();
      setTrafficData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Traffic Dashboard</h2>
      <TrafficTable data={trafficData} />
    </div>
  );
};

export default Dash;
