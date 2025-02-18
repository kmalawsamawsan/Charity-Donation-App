import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Heart, Users, Settings, LogOut } from 'lucide-react';

const Sidebar = React.memo(({ isOpen, setIsOpen }) => {
  return (
    <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-200 ease-in-out z-50`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-green-600">القائمة</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-500">×</button>
        </div>
        <nav className="space-y-4">
          <Link to="/" className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg">
            <Home className="h-5 w-5" />
            <span>الرئيسية</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg">
            <User className="h-5 w-5" />
            <span>الملف الشخصي</span>
          </Link>
          <Link to="/donations" className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg">
            <Heart className="h-5 w-5" />
            <span>تبرعاتي</span>
          </Link>
          <Link to="/beneficiaries" className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg">
            <Users className="h-5 w-5" />
            <span>المستفيدون</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg">
            <Settings className="h-5 w-5" />
            <span>الإعدادات</span>
          </Link>
          <button className="flex items-center gap-3 p-2 text-red-600 hover:bg-red-50 rounded-lg w-full">
            <LogOut className="h-5 w-5" />
            <span>تسجيل الخروج</span>
          </button>
        </nav>
      </div>
    </div>
  );
});

export default Sidebar;