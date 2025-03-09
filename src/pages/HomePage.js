import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter, Heart, ChevronDown, Home, AlertCircle, Users } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import axios from "axios";

const HomePage = () => {
  const [projects, setProjects] = useState([]); // لتخزين بيانات المشاريع
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الأخطاء
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [donations, setDonations] = useState({
    available: 0, // عدد الفرص التبرعية المتاحة
    completed: 0, // الفرص المكتملة
    operations: 0, // عدد العمليات التبرعية
  });
  const [isCounting, setIsCounting] = useState(true); // حالة التحكم في حركة العداد
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // حالة التحكم في ظهور الشريط العلوي
  const [donationAmount, setDonationAmount] = useState(""); // مبلغ التبرع المدخل
  const navigate = useNavigate();

  // دالة لجلب بيانات المشاريع من الخادم
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects");
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError("حدث خطأ أثناء جلب البيانات.");
      setLoading(false);
    }
  };

  // دالة لجلب بيانات التبرعات من الخادم
  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/donations");
      const donationsData = response.data;

      // حساب عدد العمليات التبرعية
      const operationsCount = donationsData.length;

      // حساب عدد المشاريع المكتملة والمتاحة
      const completedProjects = projects.filter(
        (project) => project.donation_progress >= 100
      ).length;
      const availableProjects = projects.filter(
        (project) => project.donation_progress < 100
      ).length;

      // تحديث حالة التبرعات
      setDonations({
        available: availableProjects,
        completed: completedProjects,
        operations: operationsCount,
      });
    } catch (err) {
      console.error("حدث خطأ أثناء جلب بيانات التبرعات:", err);
    }
  };

  // تنفيذ الدوال عند تحميل الصفحة
  useEffect(() => {
    fetchProjects();
    fetchDonations();
  }, []);

  // إضافة Tawk.to
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/67b25581a5c5e6190b274791/1ik89s277';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // تنظيف الكود عند إلغاء التحميل
    };
  }, []);

  const handleSearch = useCallback(() => {
    console.log('Searching for:', searchQuery);
  }, [searchQuery]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "associations") {
      navigate("/associations"); // توجيه المستخدم إلى صفحة الجمعيات
    }
  };

  // تعديل دالة التبرع لنقل المبلغ إلى صفحة الدفع
  const handleDonate = (projectId, projectName) => {
    if (donationAmount) {
      navigate('/payment', { state: { donationAmount, projectName, projectId } }); // نقل المبلغ واسم المشروع
    } else {
      alert("يرجى إدخال مبلغ التبرع");
    }
  };

  // إظهار/إخفاء الشريط العلوي ببطء
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* الشريط العلوي مع التبويبات */}
      <header
        className={`fixed top-0 left-0 w-full bg-white shadow-md transition-transform duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">منصة التبرعات</h1>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
              القائمة <ChevronDown size={16} />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleTabClick("all")}
                      className={`${active ? "bg-blue-500 text-white" : "text-gray-900"} group flex w-full items-center px-4 py-2 text-sm`}
                    >
                      جميع الفرص
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleTabClick("urgent")}
                      className={`${active ? "bg-blue-500 text-white" : "text-gray-900"} group flex w-full items-center px-4 py-2 text-sm`}
                    >
                      فرص عاجلة
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleTabClick("associations")}
                      className={`${active ? "bg-blue-500 text-white" : "text-gray-900"} group flex w-full items-center px-4 py-2 text-sm`}
                    >
                      الجمعيات الخيرية
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>

      {/* محتوى الصفحة */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* قسم الإعلان المتحرك */}
        <div className="mb-8 relative overflow-hidden h-96 rounded-lg">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 8000, // تغيير الصورة كل ثمان ثوانٍ
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            className="h-full"
          >
            <SwiperSlide>
              <img src="/advertisement.png" alt="إعلان" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/b.png" alt="إعلان" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/c.png" alt="إعلان" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/d.png" alt="إعلان" className="w-full h-full object-cover" />
            </SwiperSlide>
          </Swiper>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-6 text-center z-20">
            <h2 className="text-white text-3xl font-bold mb-4">سراً وعلانيةً</h2>
            <p className="text-white text-lg mb-6">
              تعدّ المنصة الوطنية للتبرعات الحل الأسهل والآمن لإيصال التبرع إلى المحتاج في شتى مناطق ومدن المملكة من خلال عملية تبرع شفافة تحت مظلة وزارة الموارد البشرية والتنمية الاجتماعية.
            </p>
            <Link
              to="/donations"
              className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300"
              style={{ zIndex: 10 }}
            >
              تبرع الآن
            </Link>
          </div>
        </div>

        {/* قسم الإحصاءات */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">عدد الفرص التبرعية المتاحة</h3>
            <p className="text-2xl font-bold">
              <CountUp start={0} end={donations.available} duration={2} /> فرصة
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">الفرص المكتملة</h3>
            <p className="text-2xl font-bold">
              <CountUp start={0} end={donations.completed} duration={2} /> فرصة
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">عدد العمليات التبرعية</h3>
            <p className="text-2xl font-bold">
              <CountUp start={0} end={donations.operations} duration={2} /> عملية
            </p>
          </div>
        </section>

        {/* عرض المشاريع المضافة من الخادم */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">المشاريع المتاحة</h2>
          {loading ? (
            <p>جارٍ تحميل البيانات...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
                  {/* صورة المشروع */}
                  <img
                    src={`http://localhost:5000${project.image_url}`} // عرض الصورة المخزنة
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e) => (e.target.src = '/a.png')} // استخدام الصورة الافتراضية في حالة حدوث خطأ
                  />
                  {/* تفاصيل المشروع */}
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  {/* تقدم التبرع */}
                  <div className="mb-4">
                    <progress
                      value={project.donation_progress || 0}
                      max="100"
                      className="w-full h-2 bg-gray-200 rounded-full"
                    ></progress>
                    <p className="text-sm text-gray-600 mt-2">
                      {project.donation_progress || 0}% تم التبرع
                    </p>
                  </div>
                  {/* حقل إدخال المبلغ وزر التبرع */}
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      placeholder="أدخل مبلغ التبرع"
                      className="flex-1 p-2 border rounded-lg"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                    />
                    <button
                      onClick={() => handleDonate(project.id, project.title)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      تبرع الآن
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* القسم الأول: مشاريع توفير الغذاء */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">مشاريع توفير الغذاء</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* مشروع 1: إفطار الصائم */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="/as.png"
                alt="إفطار الصائم"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">١. إفطار الصائم</h3>
              <p>تستهدف 1075 حالة</p>
              <p>تضمين وجبات إفطار يومية للصائمين</p>
              <progress value={75} max="100" className="w-full h-2 bg-gray-200 rounded-full mt-4"></progress>
              <p className="text-sm text-gray-600 mt-2">75% تم التبرع</p>
              <div className="flex items-center space-x-4 mt-4">
                <input
                  type="number"
                  placeholder="أدخل مبلغ التبرع"
                  className="flex-1 p-2 border rounded-lg"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <button
                  onClick={() => handleDonate("1", "إفطار الصائم")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  تبرع الآن
                </button>
              </div>
            </div>

            {/* مشروع 2: الرغيف الدافئ */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="/b.png"
                alt="الرغيف الدافئ"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">٢. الرغيف الدافئ</h3>
              <p>تستهدف 10000 حالة</p>
              <p>إنشاء مطابخ خيرية لتقديم وجبات ساخنة للعائلات المحتاجة</p>
              <progress value={50} max="100" className="w-full h-2 bg-gray-200 rounded-full mt-4"></progress>
              <p className="text-sm text-gray-600 mt-2">50% تم التبرع</p>
              <div className="flex items-center space-x-4 mt-4">
                <input
                  type="number"
                  placeholder="أدخل مبلغ التبرع"
                  className="flex-1 p-2 border rounded-lg"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <button
                  onClick={() => handleDonate("2", "الرغيف الدافئ")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  تبرع الآن
                </button>
              </div>
            </div>

            {/* مشروع 3: سلة رمضان المبارك */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="/c.png"
                alt="سلة رمضان المبارك"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">٣. سلة رمضان المبارك</h3>
              <p>تستهدف 4500 حالة</p>
              <p>توزيع طرود غذائية تشمل الاحتياجات الأساسية لشهر الكريم في المناطق المحتاجة</p>
              <progress value={90} max="100" className="w-full h-2 bg-gray-200 rounded-full mt-4"></progress>
              <p className="text-sm text-gray-600 mt-2">90% تم التبرع</p>
              <div className="flex items-center space-x-4 mt-4">
                <input
                  type="number"
                  placeholder="أدخل مبلغ التبرع"
                  className="flex-1 p-2 border rounded-lg"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <button
                  onClick={() => handleDonate("3", "سلة رمضان المبارك")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  تبرع الآن
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* القسم الثاني: مشاريع الدعم المالي */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">مشاريع الدعم المالي</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* مشروع 1: عون الحياة */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="/d.png"
                alt="عون الحياة"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">١. عون الحياة</h3>
              <p>تستهدف 1000 حالة</p>
              <p>تقديم المساعدة المالية الشهرية لتلبية احتياجات الأسر الأكثر فقرًا</p>
              <progress value={60} max="100" className="w-full h-2 bg-gray-200 rounded-full mt-4"></progress>
              <p className="text-sm text-gray-600 mt-2">60% تم التبرع</p>
              <div className="flex items-center space-x-4 mt-4">
                <input
                  type="number"
                  placeholder="أدخل مبلغ التبرع"
                  className="flex-1 p-2 border rounded-lg"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <button
                  onClick={() => handleDonate("4", "عون الحياة")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  تبرع الآن
                </button>
              </div>
            </div>

            {/* مشروع 2: رعاية الأسر اليتيمة */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="/ht.png"
                alt="رعاية الأسر اليتيمة"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">٢. رعاية الأسر اليتيمة</h3>
              <p>تستهدف 5665 حالة</p>
              <p>توفير الاحتياجات التي تلبي حاجة الأسر الفقيرة طوال الشهر المبارك</p>
              <progress value={80} max="100" className="w-full h-2 bg-gray-200 rounded-full mt-4"></progress>
              <p className="text-sm text-gray-600 mt-2">80% تم التبرع</p>
              <div className="flex items-center space-x-4 mt-4">
                <input
                  type="number"
                  placeholder="أدخل مبلغ التبرع"
                  className="flex-1 p-2 border rounded-lg"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <button
                  onClick={() => handleDonate("5", "رعاية الأسر اليتيمة")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  تبرع الآن
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* القسم الثالث: مشاريع الأطفال والأيتام */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">مشاريع الأطفال والأيتام</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* مشروع 1: بسمة عيد */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="/f.png"
                alt="بسمة عيد"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">١. بسمة عيد</h3>
              <p>تستهدف 3000 حالة</p>
              <p>توزيع ملابس العيد وحلويات على الأيتام لإدخال البهجة إلى قلوبهم</p>
              <progress value={70} max="100" className="w-full h-2 bg-gray-200 rounded-full mt-4"></progress>
              <p className="text-sm text-gray-600 mt-2">70% تم التبرع</p>
              <div className="flex items-center space-x-4 mt-4">
                <input
                  type="number"
                  placeholder="أدخل مبلغ التبرع"
                  className="flex-1 p-2 border rounded-lg"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <button
                  onClick={() => handleDonate("6", "بسمة عيد")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  تبرع الآن
                </button>
              </div>
            </div>

            {/* مشروع 2: حلم طفل */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="/ra.png"
                alt="حلم طفل"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">٢. حلم طفل</h3>
              <p>تستهدف 7000 حالة</p>
              <p>توفير الألعاب للأطفال المحتاجين لإعادة البهجة إلى وجوههم</p>
              <progress value={55} max="100" className="w-full h-2 bg-gray-200 rounded-full mt-4"></progress>
              <p className="text-sm text-gray-600 mt-2">55% تم التبرع</p>
              <div className="flex items-center space-x-4 mt-4">
                <input
                  type="number"
                  placeholder="أدخل مبلغ التبرع"
                  className="flex-1 p-2 border rounded-lg"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <button
                  onClick={() => handleDonate("7", "حلم طفل")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  تبرع الآن
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;