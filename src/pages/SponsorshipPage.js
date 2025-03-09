import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MapPin, User, Users, Smile, Calendar, Facebook, Twitter, Instagram } from 'lucide-react';
import { orphanCards } from '../data';

const SponsorshipPage = () => {
  const { id } = useParams(); // استخراج الـ id من الرابط
  const navigate = useNavigate();
  const [sponsorshipType, setSponsorshipType] = useState("دورية");
  const [sponsorshipAmount, setSponsorshipAmount] = useState(400);
  const [numberOfOrphans, setNumberOfOrphans] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState(""); // رقم الجوال

  // البحث عن اليتيم باستخدام الـ id
  const orphan = orphanCards.find((card) => card.id === parseInt(id));

  if (!orphan) {
    return <div>اليتيم غير موجود</div>; // تحقق من وجود اليتيم
  }

  const handleSponsorshipTypeChange = (type) => {
    setSponsorshipType(type);
    if (type === "واحدة") {
      setSponsorshipAmount(400); // إعادة تعيين المبلغ الافتراضي للكفالة الواحدة
    }
  };

  const handleNumberOfOrphansChange = (value) => {
    setNumberOfOrphans(value);
    setSponsorshipAmount(400 * value); // تحديث المبلغ بناءً على عدد الأيتام
  };

  const handleDonateNow = () => {
    if (!phoneNumber) {
      alert("يرجى إدخال رقم الجوال");
      return;
    }

    const donationDetails = {
      type: sponsorshipType,
      amount: sponsorshipAmount,
      numberOfOrphans: numberOfOrphans,
      orphanName: orphan.title,
      orphanId: orphan.id,
      phoneNumber: phoneNumber,
    };

    navigate('/payment', { state: { donationAmount: sponsorshipAmount } }); // نقل المبلغ إلى صفحة الدفع
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-40" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
          <div className="relative">
            <img src={orphan.image} alt={orphan.title} className="w-full h-64 object-cover" />
            <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-lg">
              الأيتام
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mt-4">{orphan.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{orphan.region}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <User className="h-4 w-4 mr-2" />
            <span>{orphan.gender}</span>
            <Calendar className="h-4 w-4 mr-2 ml-4" />
            <span>{orphan.age}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <Users className="h-4 w-4 mr-2" />
            <span>{orphan.parents}</span>
            <Smile className="h-4 w-4 mr-2 ml-4" />
            <span>{orphan.health}</span>
          </div>
          <p className="text-gray-600 mt-4">{orphan.description}</p>
          <div className="flex gap-4 mt-6">
            <a  className="text-blue-600">
              <Facebook className="h-6 w-6" />
            </a>
            <a  className="text-blue-400">
              <Twitter className="h-6 w-6" />
            </a>
            <a className="text-pink-600">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">خيارات الكفالة</h3>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleSponsorshipTypeChange("دورية")}
              className={`py-2 px-4 rounded-lg ${
                sponsorshipType === "دورية" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              كفالة دورية
            </button>
            <button
              onClick={() => handleSponsorshipTypeChange("واحدة")}
              className={`py-2 px-4 rounded-lg ${
                sponsorshipType === "واحدة" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              كفالة واحدة
            </button>
          </div>

          {sponsorshipType === "دورية" && (
            <div className="mb-6">
              <p className="text-gray-600 mb-2">تكلفة الكفالة كل شهر: {sponsorshipAmount.toLocaleString('en')} ر.س</p>
              <input
                type="number"
                value={sponsorshipAmount}
                onChange={(e) => setSponsorshipAmount(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              />
              <p className="text-sm text-gray-500 mt-2">
                راجع أقرب بنك لتوثيق الاستقطاع تلقائيا في اليوم الأول من كل شهر ميلادي.
              </p>
            </div>
          )}

          {sponsorshipType === "واحدة" && (
            <div className="mb-6">
              <p className="text-gray-600 mb-2">عدد الأيتام المكفولين: {numberOfOrphans}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNumberOfOrphansChange(numberOfOrphans - 1)}
                  className="bg-gray-200 text-gray-800 py-1 px-3 rounded-lg"
                  disabled={numberOfOrphans <= 1}
                >
                  -
                </button>
                <span>{numberOfOrphans}</span>
                <button
                  onClick={() => handleNumberOfOrphansChange(numberOfOrphans + 1)}
                  className="bg-gray-200 text-gray-800 py-1 px-3 rounded-lg"
                >
                  +
                </button>
              </div>
              <p className="text-gray-600 mt-2">تكلفة الكفالة: {(400 * numberOfOrphans).toLocaleString('en')} ر.س</p>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">رقم الجوال</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="ادخل رقم جوالك للمتابعة"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <p className="text-sm text-gray-600">
              باتمام التبرع فأنت توافق على{' '}
              <a href="/policy" className="text-blue-600">
                سياسة التبرع
              </a>
              .
            </p>
          </div>

          <button
            onClick={handleDonateNow}
            className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Heart className="h-5 w-5" />
            <span>تبرع الآن</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipPage;