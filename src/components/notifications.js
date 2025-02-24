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

const DonationPage = () => {
  const [amount, setAmount] = useState(30);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isGift, setIsGift] = useState(false);

  return (
    <div className="donation-page">
      <div className="donation-basket">
        <h1>سلة التبرعات</h1>
        <div className="donation-item">
          <img src="path/to/image.jpg" alt="Donation Campaign" />
          <div className="donation-details">
            <p>التخفيف من معاناة الأيتام والمحتاجين.</p>
            <div className="donation-amount">
              <label>مبلغ التبرع</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /> ريـال
            </div>
            <div className="gift-toggle">
              <label>هدية</label>
              <input type="checkbox" checked={isGift} onChange={() => setIsGift(!isGift)} />
            </div>
          </div>
        </div>
      </div>
      <div className="payment-section">
        <h2>دفع</h2>
        <div className="mobile-number">
          <label>رقم الجوال</label>
          <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        </div>
        <div className="total-amount">
          <p>30 ريـال</p>
          <p>المبلغ الإجمالي</p>
        </div>
        <button className="donate-button">تبرع</button>
        <p>من خلال متابعة الدفع، فأنت توافق على <a href="#">شروط وأحكام التبرع</a></p>
      </div>
    </div>
  );
};

export default DonationPage;
