import React, { createContext, useState, useContext } from "react";

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
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
