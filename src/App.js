import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import DonationsPage from "./pages/DonationsPage.js";
import BeneficiariesPage from "./pages/BeneficiariesPage.js";
import SettingsPage from "./pages/SettingsPage.js";
import Auth from "./pages/Auth.js";
import ReportsPage from "./pages/ReportsPage.js";
import ContactPage from "./pages/ContactPage.js";
import ServicesPage from "./pages/ServicesPage.js";
import AboutPage from "./pages/AboutPage.js";
import PaymentPage from "./pages/PaymentPage.js";
import NotFound from "./pages/NotFound.js";
import Header from "./components/Header.js";
import Sidebar from "./components/Sidebar.js";
import BottomNav from "./components/BottomNav.js";
import Footer from "./components/Footer.js";
import ScrollToTop from "./components/ScrollToTop.js";
import { AuthProvider, useAuth } from "./context/AuthContext.js";
import { FavoritesProvider } from "./context/FavoritesContext.js";
import { NotificationsProvider } from "./context/NotificationsContext.js";

import "./i18n.js";
import ZakatCalculator from './components/ZakatCalculator.js';
import SadaqahPage from './pages/SadaqahPage.js';
import ZakatPage from './pages/ZakatPage.js';
import OrphansPage from './pages/OrphansPage.js';
import KaffarahPage from './pages/KaffarahPage.js';
import LivestockPage from './pages/LivestockPage.js';
import WaqfPage from './pages/WaqfPage.js';
import AssociationsPage from "./pages/AssociationsPage.js";
import NotificationsSettingsPage from "./pages/notifications-settings.js";
import SponsorshipPage from './pages/SponsorshipPage.js';
import PolicyPage from './pages/PolicyPage.js';
import AdminDashboard from "./pages/AdminDashboard.js";
import CampaignsPage from './pages/Campaigns.js';
import Navbar from './components/Navbar.js';
import ManualPayment from './components/ManualPayment.js';

// مكون ProtectedRoute لحماية المسارات التي تتطلب تسجيل دخول المسؤول
const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    return <Navigate to="/" />; // إعادة التوجيه إلى الصفحة الرئيسية إذا لم يكن هناك رمز مصادقة
  }
  return children;
};

const AppContent = () => {
  const { userRole } = useAuth(); // جلب userRole من سياق المصادقة
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Navbar */}
      <Navbar userRole={userRole} />
      {/* Header مع زر لفتح/إغلاق Sidebar */}
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      {/* Sidebar مع حالة فتح/إغلاق */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      {/* ScrollToTop لتصفح سلس */}
      <ScrollToTop />
      {/* تعريف Routes للتطبيق */}
      <Routes>
        {/* المسارات العامة */}
        <Route path="/" element={<HomePage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/beneficiaries" element={<BeneficiariesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/zakat-calculator" element={<ZakatCalculator />} />
        <Route path="/sadaqah" element={<SadaqahPage />} />
        <Route path="/zakat" element={<ZakatPage />} />
        <Route path="/orphans" element={<OrphansPage />} />
        <Route path="/kaffarah" element={<KaffarahPage />} />
        <Route path="/livestock" element={<LivestockPage />} />
        <Route path="/waqf" element={<WaqfPage />} />
        <Route path="/associations" element={<AssociationsPage />} />
        <Route path="/notifications-settings" element={<NotificationsSettingsPage />} />
        <Route path="/sponsorship/:id" element={<SponsorshipPage />} />
        <Route path="/policy" element={<PolicyPage />} />

        {/* إضافة مسار حملة التبرعات */}
        <Route path="/campaigns" element={<CampaignsPage />} />

        {/* المسارات الخاصة بالإدارة */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminDashboard /> // جعل الصفحة متاحة للجميع دون حماية
          }
        />

        {/* صفحة 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Footer و BottomNav */}
      <Footer />
      <BottomNav />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <FavoritesProvider>
          <NotificationsProvider>
            <AppContent />
          </NotificationsProvider>
        </FavoritesProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
