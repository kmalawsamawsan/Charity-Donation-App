import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const LivestockPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, targetAmount }),
    });
    if (response.ok) {
      alert('Project added successfully!');
    } else {
      alert('Failed to add project.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-green-600 mb-6">الأنعام</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            اسم المشروع
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            وصف المشروع
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetAmount">
            المبلغ المستهدف
          </label>
          <input
            type="number"
            id="targetAmount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg">
          إضافة المشروع
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* مثال 1 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="/livestock1.jpg" alt="أضحية العيد" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">١. أضحية العيد</h3>
            <p className="text-gray-600 mb-4">تقديم أضاحي العيد للأسر الفقيرة</p>
            <Link to="/payment" className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <Heart className="h-5 w-5" />
              <span>تبرع الآن</span>
            </Link>
          </div>
        </div>

        {/* مثال 2 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="/livestock2.jpg" alt="توزيع اللحوم" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">٢. توزيع اللحوم</h3>
            <p className="text-gray-600 mb-4">توزيع لحوم الأضاحي على المحتاجين</p>
            <Link to="/payment" className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <Heart className="h-5 w-5" />
              <span>تبرع الآن</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestockPage;
