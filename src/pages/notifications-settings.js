import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext';
import { useTranslation } from 'react-i18next';

const NotificationsSettingsPage = () => {
  const { notifications, setNotifications } = useNotifications();
  const { t } = useTranslation();

  const toggleDonationNotifications = () => {
    setNotifications((prev) => ({
      ...prev,
      donations: !prev.donations,
    }));
  };

  const toggleServiceNotifications = () => {
    setNotifications((prev) => ({
      ...prev,
      services: !prev.services,
    }));
  };

  return (
    <div className="pt-32 pb-20 bg-gray-100 relative">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-green-600">{t("settings.notifications")}</h2>
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="text-xl font-bold text-gray-800">{t("settings.donationNotifications")}</span>
              </div>
              <button
                onClick={toggleDonationNotifications}
                className={`px-4 py-2 rounded-lg ${notifications.donations ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                {notifications.donations ? t("settings.enabled") : t("settings.disabled")}
              </button>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t("settings.donationNotificationsDescription")}
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="text-xl font-bold text-gray-800">{t("settings.serviceNotifications")}</span>
              </div>
              <button
                onClick={toggleServiceNotifications}
                className={`px-4 py-2 rounded-lg ${notifications.services ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                {notifications.services ? t("settings.enabled") : t("settings.disabled")}
              </button>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t("settings.serviceNotificationsDescription")}
            </p>
          </div>
          {/* عرض إشعارات السلة */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="text-xl font-bold text-gray-800">إشعارات السلة</span>
              </div>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full">
                {notifications.cartCount} {/* عرض عدد الإشعارات */}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              لديك {notifications.cartCount} إشعارات جديدة.
            </p>
            {notifications.cart && notifications.cart.length > 0 ? (
              notifications.cart.map((project, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-600">تمت إضافة "{project.title}" إلى السلة.</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">لا توجد إشعارات.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettingsPage;
