import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userRole, isAuthenticated } = useAuth();

  // تحقق من تسجيل الدخول
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // تحقق من دور المستخدم
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
