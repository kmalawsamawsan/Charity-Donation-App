import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAR from "./locales/ar.json"; // استيراد ملف العربية
import translationEN from "./locales/en.json"; // استيراد ملف الإنجليزية

const resources = {
  ar: {
    translation: translationAR, // الترجمة العربية
  },
  en: {
    translation: translationEN, // الترجمة الإنجليزية
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar", // اللغة الافتراضية
  fallbackLng: "ar", // اللغة الاحتياطية
  interpolation: {
    escapeValue: false, // لا تهرب من القيم
  },
});

export default i18n;