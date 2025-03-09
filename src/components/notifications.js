import React, { createContext, useContext, useState } from 'react';
import './DonationPage.css'; // افترض أنك لديك ملف CSS للتنسيق

const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
  };

  const removeNotification = (notification) => {
    setNotifications(notifications.filter(notif => notif !== notification));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext;
