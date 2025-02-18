import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatisticsComponent = () => {
  const [statistics, setStatistics] = useState({ totalDonations: 0, totalProjects: 0 });

  const fetchStatistics = async () => {
    try {
      const donations = await axios.get('http://localhost:3001/api/donations');
      const projects = await axios.get('http://localhost:3001/api/projects');

      const totalDonations = donations.data.reduce((sum, donation) => sum + donation.Amount, 0);
      const totalProjects = projects.data.length;

      setStatistics({ totalDonations, totalProjects });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStatistics();
    const interval = setInterval(fetchStatistics, 60000); // تحديث الإحصائيات كل 60 ثانية
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>إحصائيات المنصة</h1>
      <p>إجمالي التبرعات: {statistics.totalDonations}</p>
      <p>عدد المشاريع: {statistics.totalProjects}</p>
    </div>
  );
};

export default StatisticsComponent;
