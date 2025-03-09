import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Filter, MapPin, User, Users, Smile, Calendar } from 'lucide-react';
import Tabs from '../components/Tabs';
import CategoryProjects from '../components/CategoryProjects';


const OrphansPage = () => {
  const [activeCategory, setActiveCategory] = useState("الأيتام");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedParents, setSelectedParents] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [filteredOrphanCards, setFilteredOrphanCards] = useState([]);
  const navigate = useNavigate();

  const orphanCards = [
    {
      id: 1,
      image: "/sasa.png",
      title: "سارة",
      description: "كفالة مالية بمبلغ وقدره 250 ريال",
      region: "منطقة جدة",
      gender: "أنثى",
      parents: "معلوم الأم",
      age: "8 سنوات",
      health: "سليم",
    },
    {
      id: 2,
      image: "/sarr.png",
      title: "محمد",
      description: "كفالة مالية بمبلغ وقدره 300 ريال",
      region: "منطقة الرياض",
      gender: "ذكر",
      parents: "يتيم الأب",
      age: "10 سنوات",
      health: "سليم",
    },
    {
      id: 3,
      image: "/tfll.png",
      title: "فاطمة",
      description: "كفالة مالية بمبلغ وقدره 200 ريال",
      region: "منطقة مكة المكرمة",
      gender: "أنثى",
      parents: "مجهول الوالدين",
      age: "6 سنوات",
      health: "سليم",
    },
    {
      id: 4,
      image: "/awaw.png",
      title: "علي",
      description: "كفالة مالية بمبلغ وقدره 350 ريال",
      region: "منطقة القصيم",
      gender: "ذكر",
      parents: "يتيم الأب والأم",
      age: "12 سنوات",
      health: "سليم",
    },
    {
      id: 5,
      image: "/sra.png",
      title: "ليلى",
      description: "كفالة مالية بمبلغ وقدره 400 ريال",
      region: "منطقة المدينة المنورة",
      gender: "أنثى",
      parents: "معلوم الوالدين",
      age: "5 سنوات",
      health: "سليم",
    },
    {
      id: 6,
      image: "qwe.png",
      title: "خالد",
      description: "كفالة مالية بمبلغ وقدره 500 ريال",
      region: "منطقة تبوك",
      gender: "ذكر",
      parents: "يتيم الأب",
      age: "15 سنوات",
      health: "سليم",
    },
    {
      id: 7,
      image: "/tfl.png",
      title: "ماجد",
      description: "كفالة مالية بمبلغ وقدره 250 ريال",
      region: "منطقة الرياض",
      gender: "أنثى",
      parents: "معلوم الأم",
      age: "13 سنوات",
      health: "سليم",
    },
  ];

  const handleSponsorNow = (id) => {
    navigate(`/sponsorship/${id}`); // الانتقال إلى صفحة الكفالة مع الـ id
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleParentsChange = (e) => {
    setSelectedParents(e.target.value);
  };

  const handleAgeChange = (e) => {
    setSelectedAge(e.target.value);
  };

  const applyFilters = () => {
    let filtered = orphanCards;

    if (selectedRegion) {
      filtered = filtered.filter((card) => card.region === selectedRegion);
    }

    if (selectedGender) {
      filtered = filtered.filter((card) => card.gender === selectedGender);
    }

    if (selectedParents) {
      filtered = filtered.filter((card) => card.parents === selectedParents);
    }

    if (selectedAge) {
      filtered = filtered.filter((card) => card.age === selectedAge);
    }

    setFilteredOrphanCards(filtered);
  };

  const resetFilters = () => {
    setSelectedRegion("");
    setSelectedGender("");
    setSelectedParents("");
    setSelectedAge("");
    setFilteredOrphanCards(orphanCards);
  };

  const displayedOrphanCards = filteredOrphanCards.length > 0 ? filteredOrphanCards : orphanCards;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-40" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <Tabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

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
      <path d="M12 2c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0 4.8c1.656 0 3 1.344 3 3v1.2c0 .552-.448 1-1 1s-1-.448-1-1v-1.2c0-.552-.448-1-1-1s-1 .448-1 1v1.2c0 .552-.448 1-1 1s-1-.448-1-1v-1.2c0-1.656 1.344-3 3-3zm4 12.8c-1.104 0-2-.896-2-2v-1c0-.552.448-1 1-1s1 .448 1 1v1c0 .552.448 1 1 1s1-.448 1-1v-1c0-.552.448-1 1-1s1 .448 1 1v1c0 1.104-.896 2-2 2zm-8 0c-1.104 0-2-.896-2-2v-1c0-.552.448-1 1-1s1 .448 1 1v1c0 .552.448 1 1 1s1-.448 1-1v-1c0-.552.448-1 1-1s1 .448 1 1v1c0 1.104-.896 2-2 2zm10 2h-12c-1.104 0-2-.896-2-2v-2c0-3.309 3.691-6 8-6s8 2.691 8 6v2c0 1.104-.896 2-2 2z"></path>
    </svg>
    <h2 className="text-2xl font-bold text-green-600">رعاية الأيتام</h2>
  </div>
  <h3 className="text-1xl font-bold text-black-600 mt-2">يمكنك كفالة يتيم من خلال تلبية احتياجاته العاجلة عبر الكفالة المحددة، أو الالتزام برعاية شهرية تُحدث فرقًا دائمًا في حياته من خلال الكفالة الدورية</h3>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">المنطقة</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                >
                  <option value="">جميع أنحاء المملكة</option>
                  <option value="منطقة الرياض">منطقة الرياض</option>
                  <option value="منطقة المدينة المنورة">منطقة المدينة المنورة</option>
                  <option value="منطقة الحدود الشمالية">منطقة الحدود الشمالية</option>
                  <option value="منطقة الجوف">منطقة الجوف</option>
                  <option value="منطقة تبوك">منطقة تبوك</option>
                  <option value="منطقة جازان">منطقة جازان</option>
                  <option value="منطقة القصيم">منطقة القصيم</option>
                  <option value="المنطقة الشرقية">المنطقة الشرقية</option>
                  <option value="منطقة مكة المكرمة">منطقة مكة المكرمة</option>
                  <option value="منطقة عسير">منطقة عسير</option>
                  <option value="منطقة الباحة">منطقة الباحة</option>
                  <option value="منطقة نجران">منطقة نجران</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الجنس</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedGender}
                  onChange={handleGenderChange}
                >
                  <option value="">اختر الجنس</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الوالدين</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedParents}
                  onChange={handleParentsChange}
                >
                  <option value="">اختر حالة الوالدين</option>
                  <option value="معلوم الأم">معلوم الأم</option>
                  <option value="معلوم الوالدين">معلوم الوالدين</option>
                  <option value="يتيم الأب">يتيم الأب</option>
                  <option value="يتيم الأب والأم">يتيم الأب والأم</option>
                  <option value="مجهول الوالدين">مجهول الوالدين</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">العمر</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedAge}
                  onChange={handleAgeChange}
                >
                  <option value="">اختر العمر</option>
                  <option value="أقل من سنة">أقل من سنة</option>
                  <option value="1 سنة">1 سنة</option>
                  <option value="2 سنوات">2 سنوات</option>
                  <option value="3 سنوات">3 سنوات</option>
                  <option value="4 سنوات">4 سنوات</option>
                  <option value="5 سنوات">5 سنوات</option>
                  <option value="6 سنوات">6 سنوات</option>
                  <option value="7 سنوات">7 سنوات</option>
                  <option value="8 سنوات">8 سنوات</option>
                  <option value="9 سنوات">9 سنوات</option>
                  <option value="10 سنوات">10 سنوات</option>
                  <option value="11 سنوات">11 سنوات</option>
                  <option value="12 سنوات">12 سنوات</option>
                  <option value="13 سنوات">13 سنوات</option>
                  <option value="14 سنوات">14 سنوات</option>
                  <option value="15 سنوات">15 سنوات</option>
                  <option value="16 سنوات">16 سنوات</option>
                  <option value="17 سنوات">17 سنوات</option>
                  <option value="18 سنة">18 سنة</option>
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


                حذف التصفية
              </button>
            </div>
          </div>
        )}
         {/* عرض المشاريع المضافة من الخادم حسب فئة "زكاة" */}
         <CategoryProjects categoryId={6} /> {/* 6 هو معرف فئة "زكاة" */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedOrphanCards.map((card) => (
            <div key={card.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-lg">
                  الأيتام
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{card.region}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <User className="h-4 w-4 mr-2" />
                  <span>{card.gender}</span>
                  <Calendar className="h-4 w-4 mr-2 ml-4" />
                  <span>{card.age}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{card.parents}</span>
                  <Smile className="h-4 w-4 mr-2 ml-4" />
                  <span>{card.health}</span>
                </div>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <button
                  onClick={() => handleSponsorNow(card.id)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <Heart className="h-5 w-5" />
                  <span>تكفل يتيم</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrphansPage;