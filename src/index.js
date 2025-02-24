import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import App from './App';
=======
import App from './App.js';

>>>>>>> 08540592b9365da604e50a4cb054f7526d9d9623
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
