import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase"; // استيراد auth من Firebase
import { onAuthStateChanged } from "firebase/auth"; // استيراد onAuthStateChanged

// إنشاء Context
const AuthContext = createContext();

// Provider لإدارة حالة تسجيل الدخول
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // يمكنك استخدام user لمزيد من التفاصيل
  const [userRole, setUserRole] = useState(null); // تعريف userRole

  // استخدام useEffect لتحديث حالة isAuthenticated عند تغيير حالة المستخدم
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        // تحديد userRole كجزء من بيانات المستخدم إذا كانت مخزنة في قاعدة البيانات
        const role = user.email === "admin@example.com" ? "admin" : "user"; // هذا مجرد مثال
        setUser(user);
        setUserRole(role); // إضافة دور المستخدم
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserRole(null); // إعادة تعيين دور المستخدم
      }
    });

    // تنظيف الاشتراك عند إلغاء التثبيت
    return () => unsubscribe();
  }, []);

  // دالة لتسجيل الدخول
  const login = () => {
    setIsAuthenticated(true);
  };

  // دالة لتسجيل الخروج
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setUserRole(null); // إعادة تعيين دور المستخدم
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook لاستخدام AuthContext
export const useAuth = () => {
  return useContext(AuthContext); // استخدام useContext هنا
};
