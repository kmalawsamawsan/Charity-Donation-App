// InteractionsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InteractionsList = () => {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/interactions');
        setInteractions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-32">
      <h2 className="text-2xl font-bold text-green-600 mb-6">قائمة التفاعلات</h2>
      <ul>
        {interactions.map((interaction) => (
          <li key={interaction.id} className="bg-white p-4 mb-4 rounded-lg shadow-lg">
            <p>نوع التفاعل: {interaction.type}</p>
            <p>المحتوى: {interaction.content}</p>
            <p>تاريخ الإنشاء: {new Date(interaction.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InteractionsList;
