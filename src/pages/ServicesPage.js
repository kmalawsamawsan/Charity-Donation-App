import React from 'react';
import { GiFoodTruck, GiMoneyStack, GiClothes, GiHealthIncrease } from 'react-icons/gi';
import { FaHandsHelping, FaChild } from 'react-icons/fa';

const ServicesPage = () => {
  return (
    <div className="pt-24 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-green-600 mb-8 text-center">خدماتنا</h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          نقدم مجموعة من الخدمات التي تساعد في تحسين حياة المحتاجين. انضم إلينا وساهم في صنع الفرق.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* خدمة توفير الغذاء */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-green-600 mb-4">
              <GiFoodTruck className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">توفير الغذاء</h2>
            <p className="text-gray-600 text-center">
              نقدم وجبات غذائية يومية للأسر الفقيرة والمحتاجة، خاصة خلال شهر رمضان المبارك.
            </p>
            <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">
              تبرع الآن
            </button>
          </div>

          {/* خدمة الدعم المالي */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-green-600 mb-4">
              <GiMoneyStack className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">الدعم المالي</h2>
            <p className="text-gray-600 text-center">
              نقدم مساعدات مالية شهرية للأسر الأكثر فقرًا لمساعدتهم على تلبية احتياجاتهم الأساسية.
            </p>
            <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">
              تبرع الآن
            </button>
          </div>

          {/* خدمة توفير الملابس */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-green-600 mb-4">
              <GiClothes className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">توفير الملابس</h2>
            <p className="text-gray-600 text-center">
              نوزع ملابس جديدة ومستعملة بحالة جيدة على المحتاجين، خاصة في المناسبات والأعياد.
            </p>
            <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">
              تبرع الآن
            </button>
          </div>

          {/* خدمة الرعاية الصحية */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-green-600 mb-4">
              <GiHealthIncrease className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">الرعاية الصحية</h2>
            <p className="text-gray-600 text-center">
              نقدم خدمات صحية مجانية للأسر الفقيرة، بما في ذلك الفحوصات الطبية والأدوية.
            </p>
            <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">
              تبرع الآن
            </button>
          </div>

          {/* خدمة رعاية الأيتام */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-green-600 mb-4">
              <FaChild className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">رعاية الأيتام</h2>
            <p className="text-gray-600 text-center">
              نقدم الدعم النفسي والتعليمي والمالي للأيتام لمساعدتهم على بناء مستقبل أفضل.
            </p>
            <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">
              تبرع الآن
            </button>
          </div>

          {/* خدمة المساعدات الإنسانية */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-green-600 mb-4">
              <FaHandsHelping className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">المساعدات الإنسانية</h2>
            <p className="text-gray-600 text-center">
              نقدم مساعدات إنسانية عاجلة للمتضررين من الكوارث الطبيعية والنزاعات.
            </p>
            <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">
              تبرع الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;