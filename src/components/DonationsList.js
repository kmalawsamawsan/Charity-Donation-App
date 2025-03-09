// DonationsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/donations');
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-32">
      <h2 className="text-2xl font-bold text-green-600 mb-6">قائمة التبرعات</h2>
      <ul>
        {donations.map((donation) => (
          <li key={donation.id} className="bg-white p-4 mb-4 rounded-lg shadow-lg">
            <p>المبلغ: {donation.amount} ر.س</p>
            <p>المستخدم: {donation.user_id}</p>
            <p>المشروع: {donation.project_id}</p>
            <p>تاريخ التبرع: {new Date(donation.date).toLocaleDateString()}</p>
            <p>حالة الدفع: {donation.payment_status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationsList;
