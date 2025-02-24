import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataComponent = () => {
  const [data, setData] = useState({ donors: [], projects: [], donations: [] });

  const fetchData = async () => {
    try {
      const donors = await axios.get('/api/donors');
      const projects = await axios.get('/api/projects');
      const donations = await axios.get('/api/donations');

      setData({
        donors: donors.data,
        projects: projects.data,
        donations: donations.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // تحديث البيانات كل 60 ثانية
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>بيانات المتبرعين</h1>
      <ul>
        {data.donors.map((donor) => (
          <li key={donor.DonorID}>{donor.Name}</li>
        ))}
      </ul>
      <h1>بيانات المشاريع</h1>
      <ul>
        {data.projects.map((project) => (
          <li key={project.ProjectID}>{project.Name}</li>
        ))}
      </ul>
      <h1>بيانات التبرعات</h1>
      <ul>
        {data.donations.map((donation) => (
          <li key={donation.DonationID}>{donation.Amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataComponent;
