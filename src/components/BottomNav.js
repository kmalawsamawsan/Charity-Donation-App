import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Users, Settings } from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext';

const BottomNav = React.memo(() => {
  const location = useLocation();
  const { notifications } = useNotifications();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-40">
      <div className="flex justify-around py-3">
        <Link to="/" className={`flex flex-col items-center ${location.pathname === '/' ? 'text-green-600' : 'text-gray-600'}`}>
          <Home className="h-6 w-6" />
          <span className="text-sm">الرئيسية</span>
        </Link>
        <Link to="/donations" className={`flex flex-col items-center ${location.pathname === '/donations' ? 'text-green-600' : 'text-gray-600'}`}>
          <Heart className="h-6 w-6" />
          <span className="text-sm">تبرعاتي</span>
        </Link>
        <Link to="/beneficiaries" className={`flex flex-col items-center ${location.pathname === '/beneficiaries' ? 'text-green-600' : 'text-gray-600'}`}>
          <Users className="h-6 w-6" />
          <span className="text-sm">المستفيدين</span>
        </Link>
        <Link to="/settings" className={`flex flex-col items-center ${location.pathname === '/settings' ? 'text-green-600' : 'text-gray-600'}`}>
          <Settings className="h-6 w-6" />
          <span className="text-sm">الإعدادات</span>
        </Link>
      </div>
    </nav>
  );
});

export default BottomNav;