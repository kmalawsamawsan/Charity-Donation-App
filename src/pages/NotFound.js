import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800">404 - الصفحة غير موجودة</h1>
      <p className="text-gray-600 mt-4">عذرًا، الصفحة التي تبحث عنها غير موجودة.</p>
      <Link to="/" className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg">
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;