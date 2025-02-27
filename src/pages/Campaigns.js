import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCube } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Heart, Users, Target, Globe, Gift, Shield } from "lucide-react";

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب الحملات من الخادم
  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/campaigns");
      setCampaigns(response.data);
      setLoading(false);
    } catch (err) {
      setError("حدث خطأ أثناء جلب البيانات.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* قسم البانر مع تأثير ثلاثي الأبعاد */}
      <section className="relative h-96 overflow-hidden">
        <Swiper
          effect="cube"
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCube, Autoplay, Pagination, Navigation]}
          className="h-full"
        >
          <SwiperSlide>
            <img
              src="/campaign1.jpg"
              alt="حملة إفطار الصائم"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-6">
              <h2 className="text-4xl font-bold mb-4">حملة إفطار الصائم</h2>
              <p className="text-lg">
                ساعد في إطعام آلاف الصائمين خلال شهر رمضان المبارك.
              </p>
              <Link
                to="/campaigns/1"
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
              >
                تبرع الآن
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/campaign2.jpg"
              alt="حملة الرغيف الدافئ"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-6">
              <h2 className="text-4xl font-bold mb-4">حملة الرغيف الدافئ</h2>
              <p className="text-lg">
                قدم وجبات ساخنة للأسر المحتاجة في مختلف المناطق.
              </p>
              <Link
                to="/campaigns/2"
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
              >
                تبرع الآن
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* قسم القيم والأهداف */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">قيمنا وأهدافنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Globe size={48} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-bold mb-2">التأثير العالمي</h3>
            <p className="text-gray-600">
              نعمل على توسيع نطاق مساعدتنا لتشمل المجتمعات الأكثر احتياجاً حول العالم.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Heart size={48} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-bold mb-2">الرحمة والإنسانية</h3>
            <p className="text-gray-600">
              نؤمن بأن كل تبرع هو خطوة نحو عالم أكثر رحمة وإنسانية.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Target size={48} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-bold mb-2">الشفافية</h3>
            <p className="text-gray-600">
              نضمن وصول تبرعاتك إلى المستحقين بأعلى درجات الشفافية.
            </p>
          </div>
        </div>
      </section>

      {/* قسم الحملات المتاحة */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">الحملات المتاحة</h2>
        {loading ? (
          <p className="text-center">جارٍ تحميل البيانات...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={campaign.image_url || "/default-campaign.jpg"}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4">{campaign.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users size={20} className="text-green-600" />
                      <span>{campaign.donors} متبرع</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Gift size={20} className="text-green-600" />
                      <span>{campaign.amount} ريال</span>
                    </div>
                  </div>
                  <Link
                    to={`/campaigns/${campaign.id}`}
                    className="mt-6 block w-full bg-green-600 text-white text-center px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    تبرع الآن
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* قسم الإحصاءات */}
      <section className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">إحصاءات المنصة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Shield size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold">100+</h3>
              <p>حملة ناجحة</p>
            </div>
            <div>
              <Heart size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold">50,000+</h3>
              <p>متبرع</p>
            </div>
            <div>
              <Globe size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold">10+</h3>
              <p>دول مستفيدة</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignsPage;