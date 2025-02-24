import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Users, Share, Copy, ShoppingCart, Filter } from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext';
import Tabs from '../components/Tabs'; // استيراد مكون التبويبات
import CategoryProjects from '../components/CategoryProjects'



const SadaqahPage = () => {
  const { addCartNotification } = useNotifications();
  const [activeCategory, setActiveCategory] = useState("صدقة");
  const [donationAmount, setDonationAmount] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedImpact, setSelectedImpact] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]); // حالة لتخزين المشاريع المصفاة
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      image: "/talam.png",
      title: "تعليم يتيم",
      type: "صدقة",
      purpose: "للمساجد",
      description: "أفضل صدقة ما خفيت ",
      location: "منطقة جازان",
      beneficiaries: "1,000/250",
      donationProgress: 60,
      donationAmount: "1,000 ر.س",
      impact: "رعوية", // إضافة خاصية التأثير لكل مشروع
    },
    {
      id: 2,
      image: "sokya.png",
      title: "سقيا وإكرام ضيوف الرحمن",
      type: "صدقة",
      purpose: "للمساجد",
      description: "أفضل صدقة هو سقيا الماء",
      location: "منطقة مكة المكرمة",
      beneficiaries: "10,405/118",
      donationProgress: 75,
      donationAmount: "10,405 ر.س",
      impact: "تنموية",
    },
    {
      id: 3,
      image: "/koran.png",
      title: "أكفل حلقة تحفيظ القرآن الكريم",
      type: "صدقة",
      purpose: "لتعليم الأطفال",
      description: "القرآن الكريم",
      location: "منطقة البنية",
      beneficiaries: "6,000/102",
      donationProgress: 50,
      donationAmount: "6,000 ر.س",
      impact: "إعالة",
    },
    {
      id: 4,
      image: "/sokyaa.png",
      title: "أفضل الصدقات سقيا لله",
      type: "صدقة",
      purpose: "للمساجد",
      description: "أفضل صدقة هو سقيا الماء",
      location: "منطقة نوط",
      beneficiaries: "12,500/336",
      donationProgress: 80,
      donationAmount: "12,500 ر.س",
      impact: "رعوية",
    },
    {
      id: 5,
      image: "/ksoh.png",
      title: "تبرع لكساء اليتيم",
      type: "صدقة",
      purpose: "للمساجد",
      description: "افرح طفل يتيم ",
      location: "منطقة عسير",
      beneficiaries: "4,495/35",
      donationProgress: 40,
      donationAmount: "4,495 ر.س",
      impact: "تنموية",
    },
    {
      id: 6,
      image: "/korann.png",
      title: "أكفل حلقة تحفيظ القرآن الكريم",
      type: "صدقة",
      purpose: "لتلقين الأطفال",
      description: "تحفيظ وتعليم القرآن الكريم",
      location: "منطقة عسير",
      beneficiaries: "10,000/110",
      donationProgress: 70,
      donationAmount: "10,000 ر.س",
      impact: "إعالة",
    },
  ];

  // دالة التبرع الآن
  const handleDonateNow = () => {
    navigate('/payment', { state: { donationAmount } });
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
    let filtered = projects;

    // تصفية حسب الفئات المحددة
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((project) => selectedCategories.includes(project.purpose));
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

  // دالة إعادة تعيين التصفية
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedRegion("");
    setSelectedImpact("");
    setFilteredProjects(projects); // إعادة عرض جميع المشاريع
  };

  // عرض المشاريع المصفاة أو جميع المشاريع إذا لم يتم التصفية
  const displayedProjects = filteredProjects.length > 0 ? filteredProjects : projects;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-40" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* التبويبات */}
        <Tabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <div className="flex justify-between items-center mb-6">
        <div className="p-4 bg-green-200 bg-opacity-10 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
  <div className="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 64 64"
      fill="currentColor"
      className="w-8 h-8 mr-2 text-green-600"
    >
      <path d="M32 2C16.536 2 4 14.536 4 30c0 7.293 2.734 13.937 7.22 19.172C13.99 56.89 19.718 60 26 60s12.01-3.11 14.78-10.828C52.266 43.937 55 37.293 55 30 55 14.536 41.464 2 26 2H32z"></path>
    </svg>
    <h2 className="text-2xl font-bold text-green-600">صدقة</h2>
  </div>
  <h3 className="text-1xl font-bold text-black-600 mt-2">اختر اليوم نوع التأثير الذي تريد إحداثه بتبرعك. ادعم المشاريع المستدامة مثل التعليم وبناء المساجد والمشاريع الصحية، أو قدم المساعدة الأساسية للمحتاجين مثل الطعام والملجأ والرعاية الطبية</h3>
</div>

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
                  <option value="ابناء مستفيدي الضمان الاجتماعي">ابناء مستفيدي الضمان الاجتماعي</option>
                  <option value="خدمات مجتمعية">خدمات مجتمعية</option>
                  <option value="رعاية صحية">رعاية صحية</option>
                  <option value="ثقافة وفنون">ثقافة وفنون</option>
                  <option value="ضيوف الرحمن">ضيوف الرحمن</option>
                  <option value="الأيتام">الأيتام</option>
                  <option value="أنشطة اسلامية">أنشطة اسلامية</option>
                  <option value="دعم السكن (الأسرة)">دعم السكن (الأسرة)</option>
                  <option value="زكاة الفطر">زكاة الفطر</option>
                  <option value="دعم الأوقاف">دعم الأوقاف</option>
                  <option value="التوعية والإزارة">التوعية والإزارة</option>
                  <option value="عام">عام</option>
                  <option value="مشاريع رمضانية">مشاريع رمضانية</option>
                  <option value="طوارئ وإغاثة">طوارئ وإغاثة</option>
                  <option value="التعليم">التعليم</option>
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
                  <option value="منطقة جازان">منطقة جازان</option>
                  <option value="منطقة مكة المكرمة">منطقة مكة المكرمة</option>
                  <option value="منطقة البنية">منطقة البنية</option>
                  <option value="منطقة نوط">منطقة نوط</option>
                  <option value="منطقة عسير">منطقة عسير</option>
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
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleDonateNow}
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

export default SadaqahPage;