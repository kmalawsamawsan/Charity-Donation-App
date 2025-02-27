import React, { useState } from 'react';

const ZakatCalculator = () => {
  const [activeTab, setActiveTab] = useState('gold'); // تبويب افتراضي
  const [goldWeight, setGoldWeight] = useState(0);
  const [goldPurity, setGoldPurity] = useState(24); // العيار الافتراضي
  const [silverWeight, setSilverWeight] = useState(0);
  const [investmentValue, setInvestmentValue] = useState(0);
  const [speculativeStocksValue, setSpeculativeStocksValue] = useState(0);
  const [cashAmount, setCashAmount] = useState(0);
  const [investmentName, setInvestmentName] = useState('');
  const [investmentUnits, setInvestmentUnits] = useState(0);
  const [investmentUnitValue, setInvestmentUnitValue] = useState(0);
  const [zakatAmount, setZakatAmount] = useState(0);

  // أسعار الذهب والفضة (يمكن تحديثها من مصدر خارجي)
  const goldPricePerGram = 200; // سعر الجرام الذهب بالريال السعودي
  const silverPricePerGram = 2.5; // سعر الجرام الفضة بالريال السعودي

  // حساب الزكاة
  const calculateZakat = () => {
    let totalValue = 0;
    if (activeTab === 'gold') {
      const goldValue = goldWeight * (goldPurity / 24) * goldPricePerGram;
      totalValue = goldValue;
    } else if (activeTab === 'silver') {
      const silverValue = silverWeight * silverPricePerGram;
      totalValue = silverValue;
    } else if (activeTab === 'investment') {
      totalValue = investmentUnits * investmentUnitValue;
    } else if (activeTab === 'speculativeStocks') {
      totalValue = speculativeStocksValue;
    } else if (activeTab === 'cash') {
      totalValue = cashAmount;
    }
    // نسبة الزكاة 2.5%
    const zakat = totalValue * 0.025;
    setZakatAmount(zakat.toFixed(2));
  };

  // عرض نافذة حساب الزكاة
  const showZakatPopup = () => {
    alert(
      `تحسب زكاتك على أموالك بعد مرور الحول عليها\nمبلغ الزكاة: ${zakatAmount} ر.س\nمبلغ التبرع: ${zakatAmount} ر.س\nسجل دخولك لحفظ مبلغ التبرع`
    );
    window.location.href = '/auth'; // نقل إلى صفحة تسجيل الدخول
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-16">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">حاسبة الزكاة</h2>
      {/* التبويبات */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab('gold')}
          className={`px-6 py-2 rounded-t-lg ${activeTab === 'gold' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          الذهب
        </button>
        <button
          onClick={() => setActiveTab('silver')}
          className={`px-6 py-2 rounded-t-lg ${activeTab === 'silver' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          الفضة
        </button>
        <button
          onClick={() => setActiveTab('investment')}
          className={`px-6 py-2 rounded-t-lg ${activeTab === 'investment' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          الصناديق الاستثمارية
        </button>
        <button
          onClick={() => setActiveTab('speculativeStocks')}
          className={`px-6 py-2 rounded-t-lg ${activeTab === 'speculativeStocks' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          أسهم مضاربة
        </button>
        <button
          onClick={() => setActiveTab('cash')}
          className={`px-6 py-2 rounded-t-lg ${activeTab === 'cash' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          مبلغ نقدي
        </button>
      </div>
      {/* محتوى التبويبات */}
      <div className="p-6 border border-gray-200 rounded-b-lg">
        {activeTab === 'gold' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">الذهب</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">الوزن (جرام)</label>
                <input
                  type="number"
                  value={goldWeight}
                  onChange={(e) => setGoldWeight(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">العيار</label>
                <select
                  value={goldPurity}
                  onChange={(e) => setGoldPurity(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value={24}>24 قيراط</option>
                  <option value={22}>22 قيراط</option>
                  <option value={21}>21 قيراط</option>
                  <option value={18}>18 قيراط</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'silver' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">الفضة</h3>
            <div>
              <label className="block text-gray-700">الوزن (جرام)</label>
              <input
                type="number"
                value={silverWeight}
                onChange={(e) => setSilverWeight(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        )}
        {activeTab === 'investment' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">الصناديق الاستثمارية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">اسم الصندوق</label>
                <input
                  type="text"
                  value={investmentName}
                  onChange={(e) => setInvestmentName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">عدد الوحدات</label>
                <input
                  type="number"
                  value={investmentUnits}
                  onChange={(e) => setInvestmentUnits(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">قيمة الوحدة (ر.س)</label>
                <input
                  type="number"
                  value={investmentUnitValue}
                  onChange={(e) => setInvestmentUnitValue(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'speculativeStocks' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">أسهم مضاربة</h3>
            <div>
              <label className="block text-gray-700">القيمة الإجمالية (ر.س)</label>
              <input
                type="number"
                value={speculativeStocksValue}
                onChange={(e) => setSpeculativeStocksValue(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        )}
        {activeTab === 'cash' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">مبلغ نقدي</h3>
            <div>
              <label className="block text-gray-700">المبلغ النقدي (ر.س)</label>
              <input
                type="number"
                value={cashAmount}
                onChange={(e) => setCashAmount(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        )}
        {/* نتيجة الحساب */}
        <div className="mt-6">
          <button
            onClick={calculateZakat}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            احسب الزكاة
          </button>
          {zakatAmount > 0 && (
            <button
              onClick={showZakatPopup}
              className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
            >
              عرض النتيجة
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;

// صفحة تسجيل الدخول
const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-green-600">تسجيل الدخول</h2>
        <div>
          <label className="block text-gray-700">اسم المستخدم</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
            placeholder="أدخل اسم المستخدم"
          />
        </div>
        <div>
          <label className="block text-gray-700">كلمة المرور</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
            placeholder="أدخل كلمة المرور"
          />
        </div>
        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
};

export { AuthPage };