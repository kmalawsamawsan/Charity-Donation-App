// AssociationsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssociationsList = () => {
  const [associations, setAssociations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/associations');
        setAssociations(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-32">
      <h2 className="text-2xl font-bold text-green-600 mb-6">قائمة الجمعيات</h2>
      <ul>
        {associations.map((association) => (
          <li key={association.id} className="bg-white p-4 mb-4 rounded-lg shadow-lg">
            <p>الاسم: {association.name}</p>
            <p>الوصف: {association.description}</p>
            <p>تاريخ الإنشاء: {new Date(association.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssociationsList;
