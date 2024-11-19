import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '../src//utils/analytics/tracking';
import '../src/styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
