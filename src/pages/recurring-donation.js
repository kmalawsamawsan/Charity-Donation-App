import React from "react";

const RecurringDonation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          المنصة الوطنية للتبرعات
        </h1>

        {/* زر العودة */}
        <button className="text-blue-600 hover:text-blue-800 mb-4">
          عودة
        </button>

        {/* تسجيل الدخول */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            تسجيل الدخول
          </h2>
          <input
            type="text"
            placeholder="رقم الجوال"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
          />
          <input
            type="text"
            placeholder="رقم الجوال"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
          />
        </div>

        {/* CAPTCHA */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-2">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">فال شعر يضع ورويت</span>
          </div>
          <div className="text-sm text-gray-500">RECAPTORA</div>
        </div>

        {/* زر تسجيل الدخول */}
        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
          تسجيل الدخول
        </button>

        {/* رابط التسجيل */}
        <div className="mt-4 text-sm text-gray-600">
          ليس لديك حساب؟{" "}
          <a href="/register" className="text-blue-600 hover:text-blue-800">
            سجل الآن
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecurringDonation;