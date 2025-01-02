import React from 'react';

const TrafficTable = ({ data }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>URL</th>
          <th>IP Address</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td>{entry.url}</td>
            <td>{entry.ip}</td>
            <td>{new Date(entry.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TrafficTable;
