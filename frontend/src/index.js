import React from 'react';
import ReactDOM from 'react-dom';
import { TemplateApp, WebTrafficApp } from './App'; // Import both named exports

ReactDOM.render(
  <React.StrictMode>
    <WebTrafficApp /> {/* Replace with TemplateApp if needed */}
  </React.StrictMode>,
  document.getElementById('root')
);
