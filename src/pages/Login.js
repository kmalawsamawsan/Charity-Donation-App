// src/pages/LoginPage.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login(); // تسجيل الدخول
    navigate("/reports"); // توجيه المستخدم إلى صفحة التقارير
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">تسجيل الدخول</h1>
        <button
          onClick={handleLogin}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
};

export default LoginPage;