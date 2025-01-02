// TrafficForm.js
import React, { useState } from 'react';

const TrafficForm = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);  // Pass URL to parent
      setUrl('');  // Clear the input field after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="url">URL: </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
      </div>
      <button type="submit">Submit Traffic Data</button>
    </form>
  );
};

export default TrafficForm;
