import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, ChevronDown } from 'lucide-react';

const AssociationsPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('جميع المناطق');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = [
    'جميع المناطق',
    'منطقة الرياض',
    'منطقة مكة المكرمة',
    'منطقة المدينة المنورة',
    'منطقة القصيم',
    'منطقة الشرقية',
    'منطقة عسير',
    'منطقة تبوك',
    'منطقة حائل',
    'منطقة الحدود الشمالية',
    'منطقة جازان',
    'منطقة نجران',
    'منطقة الباحة',
    'منطقة الجوف',
  ];

  const associations = [
    {
      id: 1,
      image: "/d.png",
      name: "جمعية وادي الجيل الخيرية",
      region: "منطقة الرياض",
      description: "جمعية خيرية تقوم في مركز الشيخة تقوم على رعاية الدينام والدراس والشراء القضية وتقديم الساعدات الليبية والصينية الطارئة وتشريع...",
    },
    {
      id: 2,
      image: "/d.png",
      name: "الجمعية الخيرية بمركز بداء",
      region: "منطقة تبوك",
      description: "جمعية خيرية تقوم في مركز بداء تقوم على رعاية الدينام والدراس والشراء القضية وتقديم الساعدات الليبية والصينية الطارئة وتشريع...",
    },
    {
      id: 3,
      image: "/d.png",
      name: "الجمعية الخيرية لتحفيظ القرآن الكريم بالدرب",
      region: "منطقة جازان",
      description: "جمعية خيرية منخصصة في تعليم القرآن الكريم لكافة قنات الجتمع في محافظة العرب",
    },
    {
      id: 4,
      image: "/d.png",
      name: "جمعية التنمية الأهلية بالخيار",
      region: "منطقة تبوك",
      description: "جمعية أهدافه تقوم على تقديم برامج ثقافته وجنسانية يهدف إلى تنمية الجتمع ورقابة الشراء النتائجية بمركز الخيار والقرآن الجذورية",
    },
    {
      id: 5,
      image: "/d.png",
      name: "جمعية البر الخيرية بالبرضية الجنوبية",
      region: "منطقة مكة المكرمة",
      description: "هيئة أهدافه غير ربحية تسعى إلى تقديم الخدمات الكفائية والاجتماعية النقدية أو العينية والخدمات التعليمية والثقافية...",
    },
    {
      id: 6,
      image: "/d.png",
      name: "جمعية البر والخدمات الاجتماعية بمركز صفيفه",
      region: "منطقة الرياض",
      description: "نشأة وتأسست جمعية البر والخدمات الاجتماعية بمركز صفيفه تحت أشراف الزكار الوطني للتنمية القطاع غير الربحي بموجب القرار...",
    },
    {
      id: 7,
      image: "/d.png",
      name: "جمعية الخير للتنمية الاجتماعية",
      region: "منطقة عسير",
      description: "جمعية تهدف إلى تقديم الخدمات الاجتماعية والتعليمية للمجتمع المحلي",
    },
    {
      id: 8,
      image: "/d.png",
      name: "جمعية الإحسان الخيرية",
      region: "منطقة الشرقية",
      description: "جمعية تقدم المساعدات العاجلة والخدمات الاجتماعية للمحتاجين",
    },
  ];

  const filteredAssociations = associations.filter((association) => {
    return (
      (selectedRegion === 'جميع المناطق' || association.region === selectedRegion) &&
      association.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-16">
      <h2 className="text-2xl font-bold text-green-600 mb-6">الجمعيات</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-lg appearance-none bg-white"
          >
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="ابحث عن جمعية..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-lg pr-10"
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssociations.map((association) => (
          <div key={association.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={association.image} alt={association.name} className="w-full h-40 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{association.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{association.region}</span>
              </div>
              <p className="text-gray-600 mb-4">{association.description}</p>
              <Link
                to={`/association/${association.id}`}
                className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center"
              >
                عرض التفاصيل
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssociationsPage;