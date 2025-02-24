import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Minus, Filter } from 'lucide-react';
import Tabs from '../components/Tabs';

const KaffarahPage = () => {
  const activeCategory = "كفارة";
  const navigate = useNavigate();

  // حالة لكل نوع من الكفارات
  const [quantities, setQuantities] = useState({
    fasting: 1,
    oath: 1,
    vow: 1,
  });

  // حالة للتصفية
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedImpact, setSelectedImpact] = useState("");

  // حالة لتخزين البطاقات المصفاة
  const [filteredKaffarahCards, setFilteredKaffarahCards] = useState([]);

  // بيانات الكفارات
  const kaffarahCards = [
    {
      id: 1,
      type: "fasting",
      title: "كفارة الصيام",
      description: "تقديم وجبات إفطار للصائمين ككفارة عن الإفطار في رمضان",
      image: "/kfarh.png",
      amountPerUnit: 10,
      region: "كل المملكة",
      impact: "رعوية",
    },
    {
      id: 2,
      type: "oath",
      title: "كفارة اليمين",
      description: "إجراج كفارة اليمين (إطعام 10 مساكين) نيابة عمن وجبت عليهم، وتوقيع بإضافيا لسخنين من الفقراء والساكن",
      image: "/kfara.png",
      amountPerUnit: 100,
      region: "كل المملكة",
      impact: "كفارة",
    },
    {
      id: 3,
      type: "vow",
      title: "كفارة النذر",
      description: "تقديم مساعدات مالية للفقراء ك كفارة عن النذر",
      image: "/kfarhh.png",
      amountPerUnit: 100,
      region: "كل المملكة",
      impact: "كفارة",
    },
  ];

  // دالة زيادة الكمية
  const handleIncrease = (type) => {
    setQuantities((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  // دالة تقليل الكمية
  const handleDecrease = (type) => {
    if (quantities[type] > 1) {
      setQuantities((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }));
    }
  };

  // دالة التبرع الآن
  const handleDonateNow = (amount) => {
    navigate('/payment', { state: { donationAmount: amount } });
  };

  // دالة فتح وإغلاق التصفية
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  // دالة تغيير الفئة
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories(
      selectedCategories.includes(value)
        ? selectedCategories.filter((category) => category !== value)
        : [...selectedCategories, value]
    );
  };

  // دالة تغيير المنطقة
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  // دالة تغيير التأثير
  const handleImpactChange = (e) => {
    setSelectedImpact(e.target.value);
  };

  // دالة تطبيق التصفية
  const applyFilters = () => {
    let filtered = kaffarahCards;

    // تصفية حسب الفئات المحددة
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((card) => selectedCategories.includes(card.impact));
    }

    // تصفية حسب المنطقة
    if (selectedRegion) {
      filtered = filtered.filter((card) => card.region === selectedRegion);
    }

    // تصفية حسب التأثير
    if (selectedImpact) {
      filtered = filtered.filter((card) => card.impact === selectedImpact);
    }

    // تحديث البطاقات المصفاة
    setFilteredKaffarahCards(filtered);
  };

  // دالة إعادة تعيين التصفية
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedRegion("");
    setSelectedImpact("");
    setFilteredKaffarahCards(kaffarahCards); // إعادة عرض جميع البطاقات
  };

  // البطاقات المعروضة (إما المصفاة أو جميع البطاقات)
  const displayedKaffarahCards = filteredKaffarahCards.length > 0 ? filteredKaffarahCards : kaffarahCards;

  // مكون بطاقة الكفارة
  const KaffarahCard = ({ type, title, description, image, amountPerUnit }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center mb-4">
            <span className="text-gray-800 font-bold">الكمية:</span>
            <div className="flex items-center ml-2">
              <button
                className="bg-gray-200 p-1 rounded-lg"
                onClick={() => handleDecrease(type)}
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <input
                type="text"
                className="w-12 text-center mx-2 border border-gray-300 rounded-lg"
                value={quantities[type]}
                readOnly
              />
              <button
                className="bg-gray-200 p-1 rounded-lg"
                onClick={() => handleIncrease(type)}
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
          <button
            onClick={() => handleDonateNow(quantities[type] * amountPerUnit)}
            className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Heart className="h-5 w-5" />
            <span>تبرع الآن</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-40" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* التبويبات */}
        <Tabs activeTab={activeCategory} />
        <div className="flex justify-between items-center mb-6">
        <div className="p-4 bg-green-200 bg-opacity-30 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
  <div className="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-8 h-8 mr-2 text-green-600"
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
      <path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path>
    </svg>
    <h2 className="text-2xl font-bold text-green-600">كفارة</h2>
  </div>
  <h3 className="text-1xl font-bold text-black-500 mt-2">كفر ذنوبك عن طريق كفارة الصيام، وكفارة اليمين، تبرعك سيساعد المحتاجين ويضاعف أجرك</h3>
</div>
 <button
            onClick={handleFilterToggle}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <Filter className="h-5 w-5" />
            <span>تصفية</span>
          </button>
        </div>

        {/* تبويبات التصفية */}
        {showFilters && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">الفئة</label>
                <select
                  multiple
                  className="w-full p-2 border rounded-lg"
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                >
                  <option value="رعوية">رعوية</option>
                  <option value="كفارة">كفارة</option>
                  <option value="تعليمية">تعليمية</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">المنطقة</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                >
                  <option value="">اختر المنطقة</option>
                  <option value="كل المملكة">كل المملكة</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="مكة المكرمة">مكة المكرمة</option>
                  <option value="المدينة المنورة">المدينة المنورة</option>
                  <option value="الدمام">الدمام</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">التأثير</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedImpact}
                  onChange={handleImpactChange}
                >
                  <option value="">اختر التأثير</option>
                  <option value="رعوية">رعوية</option>
                  <option value="كفارة">كفارة</option>
                  <option value="تعليمية">تعليمية</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={applyFilters}
                className="bg-orange-600 text-white py-2 px-4 rounded-lg"
              >
                تطبيق التصفية
              </button>
              <button
                onClick={resetFilters}
                className="bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                حذف الكل
              </button>
            </div>
          </div>
        )}

        {/* عرض البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedKaffarahCards.map((card) => (
            <KaffarahCard
              key={card.id}
              type={card.type}
              title={card.title}
              description={card.description}
              image={card.image}
              amountPerUnit={card.amountPerUnit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KaffarahPage;