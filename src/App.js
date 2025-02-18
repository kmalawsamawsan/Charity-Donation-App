import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DonationsPage from "./pages/DonationsPage";
import BeneficiariesPage from "./pages/BeneficiariesPage";
import SettingsPage from "./pages/SettingsPage";
import Auth from "./pages/Auth";
import ReportsPage from "./pages/ReportsPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import PaymentPage from "./pages/PaymentPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import "./i18n";
import ZakatCalculator from './components/ZakatCalculator';
import SadaqahPage from './pages/SadaqahPage';
import ZakatPage from './pages/ZakatPage';
import OrphansPage from './pages/OrphansPage';
import KaffarahPage from './pages/KaffarahPage';
import LivestockPage from './pages/LivestockPage';
import WaqfPage from './pages/WaqfPage';
import AssociationsPage from "./pages/AssociationsPage";
import NotificationsSettingsPage from "./pages/notifications-settings";
import SponsorshipPage from './pages/SponsorshipPage';
import PolicyPage from './pages/PolicyPage';
import AdminDashboard from "./pages/AdminDashboard"; // صفحة لوحة تحكم المسؤول
import CampaignsPage from './pages/Campaigns'; // تحديث استيراد صفحة الحملات
import Navbar from './components/Navbar';
import ManualPayment from './components/ManualPayment';

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
  // تحميل مكتبة PayPal SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=SAR`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // تنظيف الكود عند إلغاء التحميل
    };
  }, []);

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