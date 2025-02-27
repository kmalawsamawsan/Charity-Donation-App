import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Filter } from 'lucide-react';
import Tabs from '../components/Tabs'; // استيراد مكون التبويبات

const WaqfPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [amounts, setAmounts] = useState({}); // حالة لتخزين المبالغ لكل عنصر
  const [showFilters, setShowFilters] = useState(false); // حالة لعرض/إخفاء التصفية
  const [selectedCategories, setSelectedCategories] = useState([]); // حالة لتخزين الفئات المحددة
  const [selectedRegion, setSelectedRegion] = useState(""); // حالة لتخزين المنطقة المحددة
  const [selectedImpact, setSelectedImpact] = useState(""); // حالة لتخزين التأثير المحدد
  const [filteredWaqfItems, setFilteredWaqfItems] = useState([]); // حالة لتخزين العناصر المصفاة
  const itemsPerPage = 6;
  const activeCategory = " الأوقاف"; // تحديد التبويب النشط
  const navigate = useNavigate();

  // مصفوفة أسماء الصور
  const images = ["korann.png", "koran.png", "msa.jpg", "gmmm.png", "gm.png", "gmm.png"];

  const waqfItems = [
    { id: 1, title: "مصحف القلم القارئ لحفظ وتلاوة القرآن الكريم", description: "عدد المستفيدين: 0 - المنطقة: الرياض", progress: 0, region: "الرياض", impact: "رعوية" },
    { id: 2, title: "المشروع الاستثماري لكفالة الحلقات القرآنية", description: "عدد المستفيدين: 0 - المنطقة: جدة", progress: 0, region: "جدة", impact: "تنموية" },
    { id: 3, title: "بناء جامع كبير في محافظة جدة", description: "عدد المستفيدين:0  - المنطقة: جدة", progress: 0, region: "جدة", impact: "رعوية" },
    { id: 4, title: "صرح رؤية", description: "عدد المستفيدين:0  - المنطقة: مكة", progress: 0, region: "مكة", impact: "تنموية" },
    { id: 5, title: "وقف الدعوة الإستثماري بوادي الحيا", description: "عدد المستفيدين: 0 - المنطقة: وادي الحيا", progress: 0, region: "وادي الحيا", impact: "رعوية" },
    { id: 6, title: "البئر الاستثماري الأول لجمعية تحفيظ الشعاب", description: "عدد المستفيدين: 0 - المنطقة: الشعاب", progress: 0, region: "الشعاب", impact: "تنموية" }
  ];

  // دالة لتطبيق التصفية
  const applyFilters = () => {
    let filtered = waqfItems;

    // تصفية حسب الفئات المحددة
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) => selectedCategories.includes(item.impact));
    }

    // تصفية حسب المنطقة
    if (selectedRegion) {
      filtered = filtered.filter((item) => item.region === selectedRegion);
    }

    // تصفية حسب التأثير
    if (selectedImpact) {
      filtered = filtered.filter((item) => item.impact === selectedImpact);
    }

    setFilteredWaqfItems(filtered);
  };

  // دالة لإعادة تعيين التصفية
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedRegion("");
    setSelectedImpact("");
    setFilteredWaqfItems(waqfItems); // إعادة عرض جميع العناصر
  };

  // العناصر المصفاة
  const displayedWaqfItems = filteredWaqfItems.length > 0 ? filteredWaqfItems : waqfItems;

  // إدارة الصفحات
  const totalPages = Math.ceil(displayedWaqfItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = displayedWaqfItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // تحديث قيمة المبلغ لكل عنصر
  const handleAmountChange = (id, value) => {
    setAmounts((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // التبرع الآن وإرسال المبلغ إلى صفحة الدفع
  const handleDonateNow = (id) => {
    const amount = amounts[id];
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("يرجى إدخال مبلغ صالح للتبرع.");
      return;
    }
    navigate('/payment', { state: { donationAmount: parseFloat(amount) } });
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
    <h2 className="text-2xl font-bold text-green-600">الأوقاف</h2>
  </div>
  <h3 className="text-1xl font-bold text-black-600 mt-2">شارك في دعم مشاريع الأوقاف لإحداث تأثير دائم يعم بالفائدة على المجتمع ويستمر لأجيال قادمة</h3>
</div>

          <button
            onClick={() => setShowFilters(!showFilters)}
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
                  onChange={(e) =>
                    setSelectedCategories(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                >
                  <option value="رعوية">رعوية</option>
                  <option value="تنموية">تنموية</option>
                  <option value="تعليمية">تعليمية</option>
                  <option value="ترفيهية">ترفيهية</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">المنطقة</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="">اختر المنطقة</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="مكة">مكة</option>
                  <option value="وادي الحيا">وادي الحيا</option>
                  <option value="الشعاب">الشعاب</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">التأثير</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedImpact}
                  onChange={(e) => setSelectedImpact(e.target.value)}
                >
                  <option value="">اختر التأثير</option>
                  <option value="رعوية">رعوية</option>
                  <option value="تنموية">تنموية</option>
                  <option value="إعالة">إعالة</option>
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

        {/* عرض العناصر المصفاة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item, index) => {
            const imageIndex = (startIndex + index) % images.length; // تحديد الفهرس الصحيح للصورة
            const image = images[imageIndex]; // الحصول على الصورة المناسبة
            return (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-center items-center p-4">
                  <img
                    src={`/${image}`} // استخدام الصورة المناسبة
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-lg" // التنسيق المطلوب
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">{item.progress}%</span>
                    <input
                      type="number"
                      className="w-20 p-2 border rounded-lg"
                      placeholder="المبلغ"
                      value={amounts[item.id] || ""}
                      onChange={(e) => handleAmountChange(item.id, e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to="/details"
                      className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                      <span>تفاصيل</span>
                    </Link>
                    <button
                      onClick={() => handleDonateNow(item.id)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                      <Heart className="h-5 w-5" />
                      <span>تبرع الآن</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* تذييل الصفحات */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-4 py-2 rounded-lg ${
                  currentPage === page ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WaqfPage;