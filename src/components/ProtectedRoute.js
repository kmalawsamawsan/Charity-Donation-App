// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // استيراد useAuth بدلاً من AuthContext

// مكون لحماية الصفحات التي تتطلب تسجيل دخول
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // استخدام useAuth

  // إذا لم يكن المستخدم مسجل دخول، يتم توجيهه إلى صفحة تسجيل الدخول
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // إذا كان مسجل دخول، يتم عرض الصفحة المطلوبة
  return children;
};

export default ProtectedRoute;