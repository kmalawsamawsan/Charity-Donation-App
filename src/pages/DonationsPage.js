import React, { useState } from "react";
import { Search, ShoppingCart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DonationsPage = () => {
  const [activeCategory, setActiveCategory] = useState("صدقة");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [donationAmounts, setDonationAmounts] = useState({
    1: 30, // مبلغ افتراضي للمشروع الأول
    2: 30, // مبلغ افتراضي للمشروع الثاني
  });
  const [showCart, setShowCart] = useState(false); // عرض/إخفاء السلة
  const navigate = useNavigate();

  const categories = [
    { id: "صدقة", label: "صدقة", link: "/sadaqah" },
    { id: "زكاة", label: "زكاة", link: "/zakat" },
    { id: "الأيتام", label: "الأيتام", link: "/orphans" },
    { id: "كفارة", label: "كفارة", link: "/kaffarah" },
    { id: "الأنعام", label: "الأنعام", link: "/livestock" },
    { id: "الأوقاف", label: "الأوقاف", link: "/waqf" }
  ];

  const donationProjects = [
    {
      id: 1,
      title: "صيانة المساجد",
      category: "صدقة",
      location: "منطقة مكة المكرمة",
      beneficiaries: 4,
      targetAmount: 20800,
      currentAmount: 9542,
      image: "/logo.png",
      tags: ["صدقة", "تبرع"]
    },
    {
      id: 2,
      title: "إفطار الصائمين والمعتكفين",
      category: "صدقة",
      location: "منطقة المدينة المنورة",
      beneficiaries: 500,
      targetAmount: 20000,
      currentAmount: 13870,
      image: "/th.jpg",
      tags: ["صدقة", "تبرع"]
    },
  ];

  const calculateProgress = (current, target) => {
    return Math.round((current / target) * 100);
  };

  const handleAddToCart = (project) => {
    setCartItems([...cartItems, project]);
    alert(`تمت إضافة "${project.title}" إلى السلة`);
  };

  const handleRemoveFromCart = (projectId) => {
    setCartItems(cartItems.filter(item => item.id !== projectId));
  };

  const handleShare = async (project) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/donate/${project.id}`);
      alert("تم نسخ الرابط بنجاح!");
    } catch (err) {
      console.error("فشل نسخ الرابط:", err);
    }
  };

  const handleCategoryClick = (category) => {
    if (category.link) {
      navigate(category.link);
    } else {
      setActiveCategory(category.id);
    }
  };

  const handleDonate = (projectId) => {
    const amount = donationAmounts[projectId] || 0;
    if (amount <= 0) {
      alert("يرجى إدخال مبلغ تبرع صحيح.");
      return;
    }
    navigate("/payment", { state: { donationAmount: amount } });
  };

  const handleDonationAmountChange = (projectId, amount) => {
    setDonationAmounts(prevAmounts => ({
      ...prevAmounts,
      [projectId]: amount
    }));
  };

  const filteredProjects = donationProjects.filter(project =>
    project.category === activeCategory &&
    (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-20" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">فرص التبرع</h1>
          
          {/* حقل البحث */}
          <div className="relative w-96">
            <input
              type="text"
              className="w-full pr-10 pl-4 py-2 border rounded-lg"
              placeholder="بحث"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* التصنيفات */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* المشاريع */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg m-2"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-500 text-white text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="ml-4">منطقة: {project.location}</span>
                  <span>عدد المستفيدين: {project.beneficiaries}</span>
                </div>

                {/* شريط التقدم */}
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${calculateProgress(project.currentAmount, project.targetAmount)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span>{project.currentAmount} ريال</span>
                    <span>{project.targetAmount} ريال</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      مبلغ التبرع
                      <span className="font-bold text-black mr-2">
                        {donationAmounts[project.id] || 30} ريال
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShare(project)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Share2 size={20} />
                      </button>
                      <button
                        onClick={() => handleAddToCart(project)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <ShoppingCart size={20} />
                      </button>
                      <button
                        onClick={() => handleDonate(project.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        تبرع
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm text-gray-600 mb-1">مبلغ التبرع</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-lg"
                      placeholder="أدخل مبلغ التبرع"
                      value={donationAmounts[project.id] || 30}
                      onChange={(e) => handleDonationAmountChange(project.id, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* عرض السلة */}
        {showCart && (
          <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4">سلة التبرعات</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.title}</span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  حذف
                </button>
              </div>
            ))}
            <button
              onClick={() => setShowCart(false)}
              className="w-full bg-green-600 text-white py-2 rounded-lg mt-4"
            >
              إغلاق السلة
            </button>
          </div>
        )}

        {/* زر عرض السلة */}
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg"
        >
          <ShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default DonationsPage;