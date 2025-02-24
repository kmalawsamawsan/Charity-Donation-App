import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Globe } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const { currentUser, logout } = useAuth();

  // تغيير اللغة
  const changeLanguage = () => {
    const newLanguage = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLanguage);
  };

  // تسجيل الخروج
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="pt-32 pb-20 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-8">{t("settings.title")}</h2>

        {/* اللغة */}
        <div className="rounded-lg shadow-lg mb-8 bg-white">
          <div className="p-6 border-b border-gray-200">
            <button
              onClick={changeLanguage}
              className="w-full flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <Globe className="h-6 w-6 text-gray-600" />
                <span className="text-xl">{t("settings.language")}</span>
              </div>
              <span className="text-xl">
                {i18n.language === "ar" ? "العربية" : "English"}
              </span>
            </button>
          </div>
        </div>

        {/* الخصوصية */}
        <div className="rounded-lg shadow-lg mb-8 bg-white">
          <div className="p-6 border-b border-gray-200">
            <Link to="/privacy" className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span role="img" aria-label="privacy">🔒</span>
                <span className="text-xl">{t("settings.privacy")}</span>
              </div>
              <span className="text-xl">{t("settings.viewDetails")}</span>
            </Link>
          </div>
        </div>

        {/* تسجيل الخروج */}
        {currentUser && (
          <div className="rounded-lg shadow-lg bg-white">
            <div className="p-6">
              <button
                onClick={handleLogout}
                className="text-red-600 w-full text-right flex items-center justify-end gap-2"
              >
                <LogOut className="h-6 w-6" />
                <span className="text-xl">{t("settings.logout")}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;