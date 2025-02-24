import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Minus, Filter } from 'lucide-react';
import Tabs from '../components/Tabs';

const LivestockPage = () => {
  const activeCategory = "الأنعام";
  const navigate = useNavigate();

  // حالة لكل واجهة
  const [livestockData, setLivestockData] = useState({
    sacrifice: { quantity: 1, type: 'نعيمي', phone: '', error: '' },
    meatDistribution: { quantity: 1, type: 'نعيمي', phone: '', error: '' },
    sadaqah: { quantity: 1, type: 'نعيمي', phone: '', error: '' },
    aqeeqah: { quantity: 1, type: 'نعيمي', phone: '', error: '' },
    fidya: { quantity: 1, type: 'نعيمي', phone: '', error: '' },
  });

  // حالة لإدارة التصفية
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedImpact, setSelectedImpact] = useState("");
  const [filteredLivestockCards, setFilteredLivestockCards] = useState([]);

  // بيانات بطاقات الأنعام
  const livestockCards = [
    {
      id: 1,
      type: "sacrifice",
      title: "١. أضحية العيد",
      description: "تقديم أضاحي العيد للأسر الفقيرة",
      image: "/aa.png",
      region: "منطقة الرياض",
      impact: "رعوية",
    },
    {
      id: 2,
      type: "meatDistribution",
      title: "٢. توزيع اللحوم",
      description: "  توزيع لحوم الأضاحي للمحتاجين والايتام ",
      image: "/ab.png",
      region: "منطقة مكة المكرمة",
      impact: "تنموية",
    },
    {
      id: 3,
      type: "sadaqah",
      title: "٣. صدقة الأنعام",
      description: "تقديم صدقات من الأنعام للمحتاجين",
      image: "/ac.png",
      region: "منطقة جدة",
      impact: "تعليمية",
    },
    {
      id: 4,
      type: "aqeeqah",
      title: "٤. العقيقة",
      description: "تقديم العقيقة للأسر الفقيرة",
      image: "/ad.png",
      region: "منطقة الدمام",
      impact: "رعوية",
    },
    {
      id: 5,
      type: "fidya",
      title: "٥. الفدية",
      description: "تقديم الفدية للمحتاجين",
      image: "/af.png",
      region: "منطقة الطائف",
      impact: "تنموية",
    },
  
  ];

  // دالة لزيادة الكمية
  const handleIncrease = (type) => {
    setLivestockData((prev) => ({
      ...prev,
      [type]: { ...prev[type], quantity: prev[type].quantity + 1 },
    }));
  };

  // دالة لتقليل الكمية
  const handleDecrease = (type) => {
    if (livestockData[type].quantity > 1) {
      setLivestockData((prev) => ({
        ...prev,
        [type]: { ...prev[type], quantity: prev[type].quantity - 1 },
      }));
    }
  };

  // دالة لتحديث نوع الماشية
  const handleTypeChange = (type, value) => {
    setLivestockData((prev) => ({
      ...prev,
      [type]: { ...prev[type], type: value },
    }));
  };

  // دالة لتحديث رقم الجوال (بدون تحقق فوري)
  const handlePhoneChange = (type, value) => {
    setLivestockData((prev) => ({
      ...prev,
      [type]: { ...prev[type], phone: value, error: '' },
    }));
  };

  // دالة للتحقق من صحة رقم الجوال (يتم استدعاؤها فقط عند الضغط على زر "تبرع الآن")
  const validatePhone = (phone) => {
    const regexSaudi = /^(00966|\+966)?5\d{8}$/; // يبدأ بـ 00966 أو +966 أو 05 متبوعًا بـ 8 أرقام
    const regexInternational = /^(00966|\+966)\d{9}$/; // يبدأ بـ 00966 أو +966 متبوعًا بـ 9 أرقام
    return regexSaudi.test(phone) || regexInternational.test(phone);
  };

  // دالة لحساب السعر
  const calculatePrice = (type, quantity) => {
    switch (livestockData[type].type) {
      case 'حري':
        return quantity === 1 ? 1600 : quantity * 1400;
      case 'فارسي':
        return quantity === 1 ? 1400 : quantity * 1300;
      case 'عماني':
        return quantity * 1100;
      default:
        return quantity * 1000;
    }
  };

  // دالة للتبرع الآن
  const handleDonateNow = (type, event) => {
    event.preventDefault();
    const { phone } = livestockData[type];
    if (!validatePhone(phone)) {
      setLivestockData((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          error: 'يجب أن يكون الرقم من تسعة أرقام مسبوقة ب (00966 أو +966) أو ثمانية أرقام مسبوقة ب (05)',
        },
      }));
      return;
    }
    navigate('/payment', { state: { donationAmount: calculatePrice(type, livestockData[type].quantity) } });
  };

  // دالة لإظهار/إخفاء التصفية
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  // دالة لتطبيق التصفية
  const applyFilters = () => {
    let filtered = livestockCards;
    if (selectedType) {
      filtered = filtered.filter((card) => livestockData[card.type].type === selectedType);
    }
    if (selectedRegion) {
      filtered = filtered.filter((card) => card.region === selectedRegion);
    }
    if (selectedImpact) {
      filtered = filtered.filter((card) => card.impact === selectedImpact);
    }
    setFilteredLivestockCards(filtered);
  };

  // دالة لإعادة تعيين التصفية
  const resetFilters = () => {
    setSelectedType("");
    setSelectedRegion("");
    setSelectedImpact("");
    setFilteredLivestockCards([]);
  };

  // البطاقات المعروضة بعد التصفية
  const displayedLivestockCards = filteredLivestockCards.length > 0 ? filteredLivestockCards : livestockCards;

  // مكون بطاقة الماشية
  const LivestockCard = ({ type, title, description, image }) => {
    const { quantity, type: selectedType, phone, error } = livestockData[type];

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover mx-auto my-4 rounded-lg"
          style={{ marginLeft: '1rem', marginRight: '1rem', marginTop: '1rem', marginBottom: '1rem' }}
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`${type}-type`}>
              نوع الماشية
            </label>
            <select
              id={`${type}-type`}
              className="w-full p-2 border rounded-lg"
              value={selectedType}
              onChange={(e) => handleTypeChange(type, e.target.value)}
            >
              <option value="نعيمي">نعيمي</option>
              <option value="حري">حري</option>
              <option value="فارسي">فارسي</option>
              <option value="عماني">عماني</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-800 font-bold">الكمية:</span>
            <div className="flex items-center ml-2">
              <button className="bg-gray-200 p-1 rounded-lg" onClick={() => handleDecrease(type)}>
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <input
                type="text"
                className="w-12 text-center mx-2 border border-gray-300 rounded-lg"
                value={quantity}
                readOnly
              />
              <button className="bg-gray-200 p-1 rounded-lg" onClick={() => handleIncrease(type)}>
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`${type}-phone`}>
              رقم الجوال
            </label>
            <input
              type="tel"
              id={`${type}-phone`}
              className="w-full p-2 border rounded-lg"
              placeholder="الرجاء إدخال رقم الجوال للمتابعة"
              value={phone}
              onChange={(e) => handlePhoneChange(type, e.target.value)}
              maxLength={14}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="mb-4">
            <span className="text-gray-800 font-bold">السعر: {calculatePrice(type, quantity)} ر.س</span>
          </div>
          <button
            onClick={(e) => handleDonateNow(type, e)}
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
    <h2 className="text-2xl font-bold text-green-600">الأنعام</h2>
  </div>
  <h3 className="text-1xl font-bold text-black-600 mt-2">قدّم الأضحية تعبّيرًا عن شكرك لله وطلبًا لمغفرته</h3>
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
                <label className="block text-sm font-medium mb-2">نوع الماشية</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">اختر الفئة</option>
                  <option value="خدمات مجتمعية">خدمات مجتمعية</option>
                  <option value="زكاة الفطر">زكاة الفطر</option>
                  <option value="الايتام">الايتام</option>
                  <option value="ضيوف الرحمن">ضيوف الرحمن</option>
                  <option value="رعاية صحية">رعاية صحية</option>
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
                  <option value="منطقة الرياض">منطقة الرياض</option>
                  <option value="منطقة مكة المكرمة">منطقة مكة المكرمة</option>
                  <option value="منطقة جدة">منطقة جدة</option>
                  <option value="منطقة الدمام">منطقة الدمام</option>
                  <option value="منطقة الطائف">منطقة الطائف</option>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedLivestockCards.map((card) => (
            <LivestockCard
              key={card.id}
              type={card.type}
              title={card.title}
              description={card.description}
              image={card.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LivestockPage;