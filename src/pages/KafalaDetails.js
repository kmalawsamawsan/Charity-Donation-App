import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, 
  User, 
  Users, 
  Smile, 
  Calendar, 
  Phone, 
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard,
  RepeatIcon,
  Plus,
  Minus,
  Info
} from 'lucide-react';

const KafalaDetailsPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('periodic');
  const [donationAmount, setDonationAmount] = useState(400);
  const [orphanCount, setOrphanCount] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const orphanDetails = {
    id: 7,
    image: "/f.png",
    title: "ماجد",
    description: "كفالة مالية بمبلغ وقدره 250 ريال",
    region: "منطقة الرياض",
    gender: "أنثى",
    parents: "معلوم الأم",
    age: "13 سنوات",
    health: "سليم",
  };

  const handleOrphanCount = (action) => {
    if (action === 'increment') {
      setOrphanCount(prev => prev + 1);
    } else if (action === 'decrement' && orphanCount > 1) {
      setOrphanCount(prev => prev - 1);
    }
  };

  const handleDonation = () => {
    // Navigate to payment page
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:w-2/3 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <img 
              src={orphanDetails.image} 
              alt={orphanDetails.title} 
              className="w-full md:w-96 h-80 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{orphanDetails.title}</h1>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-green-600" />
                    <span>{orphanDetails.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="text-green-600" />
                    <span>{orphanDetails.gender}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-green-600" />
                    <span>{orphanDetails.age}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-green-600" />
                    <span>{orphanDetails.parents}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smile className="text-green-600" />
                    <span>{orphanDetails.health}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">تواصل معنا</h3>
                <div className="flex gap-4">
                  <Facebook className="w-6 h-6 text-blue-600 cursor-pointer" />
                  <Twitter className="w-6 h-6 text-blue-400 cursor-pointer" />
                  <Instagram className="w-6 h-6 text-pink-600 cursor-pointer" />
                  <Youtube className="w-6 h-6 text-red-600 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Panel - Right Side */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-center mb-6">دفع التبرع</h2>
            
            <div className="flex mb-6">
              <button
                onClick={() => setActiveTab('periodic')}
                className={`flex-1 py-2 text-center ${activeTab === 'periodic' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100'} rounded-r-lg`}
              >
                كفالة دورية
              </button>
              <button
                onClick={() => setActiveTab('one-time')}
                className={`flex-1 py-2 text-center ${activeTab === 'one-time' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100'} rounded-l-lg`}
              >
                كفالة يتيم
              </button>
            </div>

            {activeTab === 'periodic' && (
              <div>
                <p className="text-gray-600 mb-4">تكلفة الكفالة كل شهر</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">المبلغ الشهري</p>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                    min="400"
                  />
                </div>
                <p className="text-sm text-blue-600 mb-4">
                  راجع اقرب بنك لتوثيق الاستقطاع تلقائيا في اليوم الاول من كل شهر ميلادي
                </p>
              </div>
            )}

            {activeTab === 'one-time' && (
              <div>
                <div className="mb-4">
                  <p className="mb-2">كم تكفل</p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleOrphanCount('decrement')}
                      className="p-2 border rounded-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={orphanCount}
                      readOnly
                      className="w-20 p-2 border rounded-lg text-center"
                    />
                    <button 
                      onClick={() => handleOrphanCount('increment')}
                      className="p-2 border rounded-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    المبلغ الإجمالي: {orphanCount * 400} ر.س
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1">رقم الجوال</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="ادخل رقم جوالك للمتابعة"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            )}

            <hr className="my-4" />
            
            <p className="text-sm text-gray-600 mb-4">
              بإتمام التبرع فإنك توافق على{' '}
              <a href="/donation-policy" className="text-green-600 underline">
                سياسة التبرع
              </a>
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleDonation}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
              >
                تبرع الآن
              </button>
              <button className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 transition duration-200">
                إضافة إلى السلة
              </button>
            </div>
          </div>

          {/* Association Info Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">معلومات عن الجمعية</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="text-green-600" />
                <span>920000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-green-600" />
                <span>info@charity.org</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-green-600" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KafalaDetailsPage;