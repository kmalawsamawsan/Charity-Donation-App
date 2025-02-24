import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

const DonationsPage = () => {
  const [activeTab, setActiveTab] = useState("صدقة"); // حالة التبويب النشط

  // قائمة التبويبات
  const tabs = ["صدقة", "زكاة", "الأيتام", "كفارة", "الأنعام", "الأوقاف"];

  return (
    
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* العنوان الرئيسي */}
        <h1 className="text-3xl font-bold text-green-600 mb-6">فرص التبرع</h1>

        {/* التبويبات */}
        <div className="flex gap-4 border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 px-4 ${
                activeTab === tab
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* شريط البحث */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="ابحث عن فرص التبرع..."
                className="w-full pr-10 pl-4 py-2 border rounded-lg text-lg"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="bg-gray-100 p-2 rounded-lg">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* تفاصيل التبرع */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* يمكنك إضافة بطاقات التبرع هنا */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/donation1.jpg"
              alt="تبرع 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">تبرع 1</h3>
              <p className="text-gray-600 mb-4">وصف قصير عن التبرع 1</p>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg">
                تبرع الآن
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/donation2.jpg"
              alt="تبرع 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">تبرع 2</h3>
              <p className="text-gray-600 mb-4">وصف قصير عن التبرع 2</p>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg">
                تبرع الآن
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/donation.jpg"
              alt="تبرع 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">تبرع 3</h3>
              <p className="text-gray-600 mb-4">وصف قصير عن التبرع 3</p>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg">
                تبرع الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationsPage;