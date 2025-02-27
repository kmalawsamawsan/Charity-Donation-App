import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { NotificationsProvider } from './context/NotificationsContext'; // تأكد من وجود هذا الملف والمسار صحيح

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </React.StrictMode>
);
