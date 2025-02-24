import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Users, Share, Copy, ShoppingCart, Filter } from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext';
import Tabs from '../components/Tabs'; // استيراد مكون التبويبات
import CategoryProjects from '../components/CategoryProjects'; // استيراد مكون عرض المشاريع حسب الفئة

const ZakatPage = () => {
  const { addCartNotification } = useNotifications();
  const [activeCategory, setActiveCategory] = useState("زكاة");
<<<<<<< HEAD
=======
  const [donationAmount, setDonationAmount] = useState("");
>>>>>>> 08540592b9365da604e50a4cb054f7526d9d9623
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedImpact, setSelectedImpact] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]); // حالة لتخزين المشاريع المصفاة
<<<<<<< HEAD
  const [donationAmounts, setDonationAmounts] = useState({}); // حالة لتخزين مبالغ التبرع لكل مشروع
=======
>>>>>>> 08540592b9365da604e50a4cb054f7526d9d9623
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      image: "/asrr.png",
      title: "اعانة الاسر الفقيرة",
      type: "زكاة",
      purpose: "تقديم المساعدة المالية الشهرية لتلبية احتياجات الأسر الأكثر فقرًا",
      description: "أفضل صدقة هو سقيا الماء",
      location: "منطقة عسير",
      beneficiaries: "4,999/74",
      donationProgress: 60,
      donationAmount: "4,999 ر.س",
      impact: "رعوية",
    },
    {
      id: 2,
      image: "/mmm.png",
      title: "رعاية الأسر اليتيمة",
      type: "زكاة",
      purpose: "توفير الاحتياجات التي تلبي حاجة الأسر الفقيرة طوال الشهر المبارك",
      description: "أفضل صدقة هو سقيا الماء",
      location: "منطقة جازان",
      beneficiaries: "40,000/12",
      donationProgress: 75,
      donationAmount: "40,000 ر.س",
      impact: "تنموية",
    },
    {
      id: 3,
      image: "/kfalh.png",
      title: "كفالة أسرة",
      type: "زكاة",
      purpose: "تقديم المساعدة المالية الشهرية لتلبية احتياجات الأسر الأكثر فقرًا",
      description: "أفضل صدقة هو سقيا الماء",
      location: "منطقة مكة المكرمة",
      beneficiaries: "6,600/3",
      donationProgress: 50,
      donationAmount: "6,600 ر.س",
      impact: "إعالة",
    },
    {
      id: 4,
      image: "/msaada.png",
      title: "مشروع المساعدات العاجلة",
      type: "زكاة",
      purpose: "تقديم المساعدة المالية الشهرية لتلبية احتياجات الأسر الأكثر فقرًا",
      description: "أفضل صدقة هو سقيا الماء",
      location: "منطقة عسير",
      beneficiaries: "2,499/13",
      donationProgress: 80,
      donationAmount: "2,499 ر.س",
      impact: "رعوية",
    },
    {
      id: 5,
      image: "/mrtha.png",
      title: "مساعدة المرضى",
      type: "زكاة",
      purpose: "تقديم المساعدة للاسر التي لديها حالات مريضة",
      description: "أفضل صدقة هو سقيا الماء",
      location: "منطقة مكة المكرمة",
      beneficiaries: "25,000/3",
      donationProgress: 40,
      donationAmount: "25,000 ر.س",
      impact: "تنموية",
    },
  ];

<<<<<<< HEAD
  const handleDonateNow = (projectId, donationAmount) => {
    navigate('/payment', { state: { donationAmount, projectId } });
=======
  const handleDonateNow = () => {
    navigate('/payment', { state: { donationAmount } });
>>>>>>> 08540592b9365da604e50a4cb054f7526d9d9623
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories(
      selectedCategories.includes(value)
        ? selectedCategories.filter((category) => category !== value)
        : [...selectedCategories, value]
    );
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleImpactChange = (e) => {
    setSelectedImpact(e.target.value);
  };

  const applyFilters = () => {
    let filtered = projects;
    // تصفية حسب الفئات المحددة
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((project) => selectedCategories.includes(project.type));
    }
    // تصفية حسب المنطقة
    if (selectedRegion) {
      filtered = filtered.filter((project) => project.location === selectedRegion);
    }
    // تصفية حسب التأثير
    if (selectedImpact) {
      filtered = filtered.filter((project) => project.impact === selectedImpact);
    }
    // تحديث المشاريع المصفاة
    setFilteredProjects(filtered);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedRegion("");
    setSelectedImpact("");
    setFilteredProjects(projects); // إعادة عرض جميع المشاريع
  };

<<<<<<< HEAD
  const handleDonationAmountChange = (projectId, amount) => {
    setDonationAmounts((prev) => ({
      ...prev,
      [projectId]: amount,
    }));
  };

=======
>>>>>>> 08540592b9365da604e50a4cb054f7526d9d9623
  const displayedProjects = filteredProjects.length > 0 ? filteredProjects : projects;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-40" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* التبويبات */}
        <Tabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <div className="flex justify-between items-center mb-6">
<<<<<<< HEAD
          <div className="p-4 bg-green-200 bg-opacity-30 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 64 64"
                fill="currentColor"
                className="w-8 h-8 mr-2 text-green-600"
              >
                <circle cx="32" cy="32" r="30" />
                <text x="32" y="37" fill="#fff" fontSize="20" fontFamily="Arial" textAnchor="middle">زكاة</text>
              </svg>
              <h2 className="text-2xl font-bold text-green-600">زكاة</h2>
            </div>
            <h3 className="text-1xl font-bold text-black-600 mt-2">طهر مالك وأدِ واجبك الإسلامي من خلال فرص الزكاة المتاحة. استخدم حاسبة الزكاة لحساب مقدار زكاتك بدقة وسهولة!</h3>
          </div>
=======
        <div className="p-4 bg-green-200 bg-opacity-30 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
  <div className="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 64 64"
      fill="currentColor"
      className="w-8 h-8 mr-2 text-green-600"
    >
      <circle cx="32" cy="32" r="30" />
      <text x="32" y="37" fill="#fff" font-size="20" font-family="Arial" text-anchor="middle">زكاة</text>
    </svg>
    <h2 className="text-2xl font-bold text-green-600">زكاة</h2>
  </div>
  <h3 className="text-1xl font-bold text-black-600 mt-2">طهر مالك وأدِ واجبك الإسلامي من خلال فرص الزكاة المتاحة. استخدم حاسبة الزكاة لحساب مقدار زكاتك بدقة وسهولة!</h3>
</div>
>>>>>>> 08540592b9365da604e50a4cb054f7526d9d9623

          <button
            onClick={handleFilterToggle}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <Filter className="h-5 w-5" />
            <span>تصفية</span>
          </button>
        </div>

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
                  <option value="زكاة">زكاة</option>
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
                  <option value="منطقة عسير">منطقة عسير</option>
                  <option value="منطقة جازان">منطقة جازان</option>
                  <option value="منطقة مكة المكرمة">منطقة مكة المكرمة</option>
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

        {/* عرض المشاريع المضافة من الخادم حسب فئة "زكاة" */}
        <CategoryProjects categoryId={6} /> {/* 6 هو معرف فئة "زكاة" */}

        {/* عرض المشاريع المحلية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-center items-center p-4">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                  <span className="text-sm text-gray-600">{project.type}</span>
                </div>
                <p className="text-gray-600 mb-4">{project.purpose}</p>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Users className="h-4 w-4 mr-2" />
                  <span>عدد المستفيدين: {project.beneficiaries}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${project.donationProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">{project.donationAmount}</span>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    placeholder="ر.س"
<<<<<<< HEAD
                    value={donationAmounts[project.id] || ""}
                    onChange={(e) => handleDonationAmountChange(project.id, e.target.value)}
=======
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
>>>>>>> 08540592b9365da604e50a4cb054f7526d9d9623
                  />
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <button
<<<<<<< HEAD
                      onClick={() => handleDonateNow(project.id, donationAmounts[project.id])}
=======
                      onClick={handleDonateNow}
>>>>>>> 08540592b9365da604e50a4cb054f7526d9d9623
                      className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2"
                    >
                      <Heart className="h-5 w-5" />
                      <span>تبرع الآن</span>
                    </button>
                    <div className="flex items-center gap-4">
                      <button
                        className="text-gray-600 hover:text-green-600"
                        onClick={() => addCartNotification(project)}
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-green-600">
                        <Share className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-green-600">
                        <Copy className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZakatPage;