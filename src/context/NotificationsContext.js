import React, { createContext, useState, useContext } from "react";

<<<<<<< HEAD
const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({
    donations: false,
    services: false,
    cart: [],
    cartCount: 0, // عدد الإشعارات
  });

  // وظيفة لإضافة إشعارات السلة
  const addCartNotification = (project) => {
    setNotifications((prev) => ({
      ...prev,
      cart: [...prev.cart, project],
      cartCount: prev.cartCount + 1, // زيادة عدد الإشعارات
    }));
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, setNotifications, addCartNotification }}
    >
=======
// إنشاء السياق
const NotificationsContext = createContext();

// مكون Provider لتوفير السياق
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // دالة لإضافة إشعار جديد
  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
  };

  // دالة لإزالة إشعار
  const removeNotification = (id) => {
    setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>
>>>>>>> 08540592b9365da604e50a4cb054f7526d9d9623
      {children}
    </NotificationsContext.Provider>
  );
};

<<<<<<< HEAD
export const useNotifications = () => useContext(NotificationsContext);
=======
// هوك لاستخدام السياق
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};
>>>>>>> 08540592b9365da604e50a4cb054f7526d9d9623
