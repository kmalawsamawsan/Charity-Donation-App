import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tabs = ({ activeTab, setActiveCategory }) => {
  const navigate = useNavigate();

  const categories = [
    { id: "صدقة", label: "صدقة", link: "/sadaqah" },
    { id: "زكاة", label: "زكاة", link: "/zakat" },
    { id: "الأيتام", label: "الأيتام", link: "/orphans" },
    { id: "كفارة", label: "كفارة", link: "/kaffarah" },
    { id: "الأنعام", label: "الأنعام", link: "/livestock" },
    { id: "الأوقاف", label: "الأوقاف", link: "/waqf" },
  ];

  const handleCategoryClick = (category) => {
    if (setActiveCategory) {
      setActiveCategory(category.id); // تحديث التبويب النشط
    }
    navigate(category.link); // الانتقال إلى الصفحة المحددة
  };

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-2 rounded-full transition-colors ${
            activeTab === category.id
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;