import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, Languages, User, ChevronDown, Heart, Gift, Users, Calculator, Calendar, BookOpen, Home, Info, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ setIsSidebarOpen }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('العربية');
  const [showDonationMenu, setShowDonationMenu] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);

  // تأخير إخفاء القائمة المنسدلة
  let timeoutId;
  const handleMouseEnter = (setMenu) => {
    clearTimeout(timeoutId); // إلغاء أي تأخير سابق
    setMenu(true); // إظهار القائمة
  };
  const handleMouseLeave = (setMenu) => {
    timeoutId = setTimeout(() => {
      setMenu(false); // إخفاء القائمة بعد تأخير
    }, 500); // تأخير 500 مللي ثانية (0.5 ثانية)
  };

  const toggleLanguage = () => {
    if (language === 'العربية') {
      setLanguage('English');
      document.documentElement.lang = 'en';
      alert('تم تغيير اللغة إلى الإنجليزية');
    } else {
      setLanguage('العربية');
      document.documentElement.lang = 'ar';
      alert('تم تغيير اللغة إلى العربية');
    }
  };

  const handleLogout = () => {
    navigate('/auth');
  };

  const donationCategories = [
    { ar: 'صدقة', en: 'Sadaqah', path: '/sadaqah', icon: <Heart className="h-5 w-5 text-green-600" /> },
    { ar: 'زكاة', en: 'Zakat', path: '/zakat', icon: <Gift className="h-5 w-5 text-green-600" /> },
    { ar: 'الأيتام', en: 'Orphans', path: '/orphans', icon: <Users className="h-5 w-5 text-green-600" /> },
    { ar: 'كفارة', en: 'Kaffarah', path: '/kaffarah', icon: <BookOpen className="h-5 w-5 text-green-600" /> },
    { ar: 'الأنعام', en: 'Livestock', path: '/livestock', icon: <Home className="h-5 w-5 text-green-600" /> },
    { ar: 'الأوقاف', en: 'Waqf', path: '/waqf', icon: <Info className="h-5 w-5 text-green-600" /> },
  ];

  const serviceCategories = [
    { ar: 'التبرع الدوري', en: 'Recurring Donation', icon: <Calendar className="h-5 w-5 text-green-600" /> },
    { ar: 'حاسبة الزكاة', en: 'Zakat Calculator', path: '/zakat-calculator', icon: <Calculator className="h-5 w-5 text-green-600" /> },
    { ar: 'الحملات', en: 'Campaigns', icon: <Heart className="h-5 w-5 text-green-600" /> },
  ];

  const renderDropdownMenu = (items, isVisible) => {
    if (!isVisible) return null;
    return (
      <div
        className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg py-2 min-w-max transform transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => handleMouseEnter(isVisible === showDonationMenu ? setShowDonationMenu : setShowServicesMenu)}
        onMouseLeave={() => handleMouseLeave(isVisible === showDonationMenu ? setShowDonationMenu : setShowServicesMenu)}
      >
        <div className="flex gap-2 px-4">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path || `/${item.en.toLowerCase().replace(' ', '-')}`}
              className="flex items-center gap-2 whitespace-nowrap text-gray-600 hover:text-green-600 hover:bg-gray-50 px-4 py-2 rounded-md text-lg transition-all duration-300 hover:shadow-md"
            >
              {item.icon} {/* إضافة الأيقونة */}
              <span>{language === 'العربية' ? item.ar : item.en}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/logo1.png" 
              alt="شعار قلوب رحيمة" 
              className="h-20 w-20 rounded-full transition-transform duration-300 hover:scale-110 object-cover" 
            />
            <span className="text-2xl font-bold text-green-600">قلوب رحيمة</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* أيقونة الإشعارات */}
          <Link to="/notifications">
            <Bell className="h-6 w-6 text-gray-600 hover:text-green-600 transition-colors duration-300" />
          </Link>

          {/* زر تغيير اللغة */}
          <button onClick={toggleLanguage} className="flex items-center gap-1 text-gray-600 hover:text-green-600">
            <Languages className="h-6 w-6" />
            <span className="text-lg">{language}</span>
          </button>

          {/* تسجيل الدخول/الخروج */}
          {currentUser ? (
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-lg">
              <User className="h-6 w-6" />
              <span>{language === 'العربية' ? 'تسجيل الخروج' : 'Logout'}</span>
            </button>
          ) : (
            <Link to="/auth" className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-lg">
              <User className="h-6 w-6" />
              <span>{language === 'العربية' ? 'تسجيل الدخول' : 'Login'}</span>
            </Link>
          )}
        </div>
      </div>

      {/* القوائم السفلية */}
      <div className="max-w-7xl mx-auto px-4 py-2 border-t flex justify-between items-center">
        <div className="flex gap-6">
          {/* قائمة فرص التبرع */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter(setShowDonationMenu)}
            onMouseLeave={() => handleMouseLeave(setShowDonationMenu)}
          >
            <Link to="/donations" className="flex items-center gap-1 text-gray-600 hover:text-green-600 text-lg">
              {language === 'العربية' ? 'فرص التبرع' : 'Donation Opportunities'}
              <ChevronDown className="h-4 w-4" />
            </Link>
            {renderDropdownMenu(donationCategories, showDonationMenu)}
          </div>

          {/* قائمة الخدمات */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter(setShowServicesMenu)}
            onMouseLeave={() => handleMouseLeave(setShowServicesMenu)}
          >
            <Link to="/services" className="flex items-center gap-1 text-gray-600 hover:text-green-600 text-lg">
              {language === 'العربية' ? 'الخدمات' : 'Services'}
              <ChevronDown className="h-4 w-4" />
            </Link>
            {renderDropdownMenu(serviceCategories, showServicesMenu)}
          </div>

          {/* رابط الجمعيات */}
          <Link to="/Associations" className="text-gray-600 hover:text-green-600 text-lg">
            {language === 'العربية' ? 'الجمعيات' : 'Associations'}
          </Link>
        </div>

        {/* الروابط الأخرى */}
        <div className="flex gap-6">
          <Link to="/about" className="text-gray-600 hover:text-green-600 text-lg">
            {language === 'العربية' ? 'عن المنصة' : 'About the Platform'}
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-green-600 text-lg">
            {language === 'العربية' ? 'اتصل بنا' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;