import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="pt-32 pb-20 bg-gray-100 relative">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        <h1 className="text-5xl font-bold text-green-600 mb-12 text-center">اتصل بنا</h1>
        <div className="space-y-8">
          <div className="bg-green-100 bg-opacity-50 p-8 rounded-lg shadow-lg flex items-start gap-4">
            <FaEnvelope className="text-green-600 text-4xl" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">البريد الإلكتروني</h2>
              <p className="text-gray-600 leading-relaxed text-xl">info@qolobrahima.com</p>
            </div>
          </div>
          <div className="bg-blue-100 bg-opacity-50 p-8 rounded-lg shadow-lg flex items-start gap-4">
            <FaPhone className="text-blue-600 text-4xl" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">رقم الهاتف</h2>
              <p className="text-gray-600 leading-relaxed text-xl">+966 123 456 789</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
