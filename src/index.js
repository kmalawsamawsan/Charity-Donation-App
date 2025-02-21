import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

import './index.css';
import { NotificationsProvider } from './context/NotificationsContext'; // استيراد NotificationsProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </React.StrictMode>
);
