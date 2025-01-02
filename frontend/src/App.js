import React from 'react';
import Dashboard from './components/Dashboard';
import logo from './logo.svg';
import './App.css';

// Named export for the template code
export const TemplateApp = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

// Named export for the Web Traffic Monitoring app
export const WebTrafficApp = () => {
  return (
    <div>
      <h1>Web Traffic Monitoring</h1>
      <Dashboard />
    </div>
  );
};

// Default export (choose one to be default, if needed)
export default WebTrafficApp;
