import React from 'react';
/* eslint-disable-next-line no-unused-vars */
import { FaPhone } from 'react-icons/fa';


const AboutPage = () => {
  return (
    <div className="pt-32 pb-20 bg-gray-100 relative">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        <h1 className="text-5xl font-bold text-green-600 mb-12 text-center">عن المنصة</h1>
        <div className="space-y-8">
          <div className="bg-green-100 bg-opacity-50 p-8 rounded-lg shadow-lg flex items-start gap-4">
            <FaBullseye className="text-green-600 text-4xl" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">الهدف</h2>
              <p className="text-gray-600 leading-relaxed text-xl">
                تهدف منصة "قلوب رحيمة" إلى مساعدة الأسر الفقيرة والمحتاجة من خلال توفير الغذاء والدعم المالي ورعاية الأيتام.
              </p>
            </div>
          </div>
          <div className="bg-red-100 bg-opacity-50 p-8 rounded-lg shadow-lg flex items-start gap-4">
            <FaHeart className="text-red-600 text-4xl" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">الرسالة</h2>
              <p className="text-gray-600 leading-relaxed text-xl">
                نسعى إلى إدخال البهجة إلى قلوب المحتاجين من خلال توفير الاحتياجات الأساسية وتحسين جودة حياتهم.
              </p>
            </div>
          </div>
          <div className="bg-blue-100 bg-opacity-50 p-8 rounded-lg shadow-lg flex items-start gap-4">
            <FaBullseye className="text-blue-600 text-4xl" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">قيمنا</h2>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed text-xl">
                <li>الشفافية</li>
                <li>المصداقية</li>
                <li>التعاون</li>
                <li>الابتكار</li>
              </ul>
            </div>
          </div>
          <div className="bg-yellow-100 bg-opacity-50 p-8 rounded-lg shadow-lg flex items-start gap-4">
            <FaEnvelope className="text-yellow-600 text-4xl" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">تواصل معنا</h2>
              <p className="text-gray-600 leading-relaxed text-xl">
                يمكنك التواصل معنا عبر البريد الإلكتروني: <a href="mailto:info@rahimahearts.com" className="text-green-600 underline">info@rahimahearts.com</a>
              </p>
              <p className="text-gray-600 leading-relaxed text-xl">
                أو عبر الهاتف: <a href="tel:+123456789" className="text-green-600 underline">+123 456 789</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
