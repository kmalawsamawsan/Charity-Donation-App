import React, { createContext, useState, useContext } from "react";

// إنشاء السياق
const NotificationsContext = createContext();

// مكون Provider لتوفير السياق
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // دالة لإضافة إشعار جديد
  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  // دالة لإزالة إشعار
  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

// هوك لاستخدام السياق
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
};