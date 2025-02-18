import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [donationAmount, setDonationAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/projects');
        const correctedProjects = response.data.map(project => ({
          ...project,
          name: decodeURIComponent(escape(project.name)),
          description: decodeURIComponent(escape(project.description)),
        }));
        setProjects(correctedProjects);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDonate = async (projectId, projectTitle) => {
    const minimumAmount = 100; // تغيير القيمة حسب الحد الأدنى المسموح به لحسابك وعملتك
    if (donationAmount < minimumAmount) {
      alert('المبلغ المدخل أقل من الحد الأدنى المسموح به.');
      return;
    }

    try {
      const response = await axios.post('/api/create-payment-intent', {
        amount: donationAmount,
      });

      const { clientSecret } = response.data;

      navigate('/payment', { state: { projectId, projectTitle, donationAmount, clientSecret } });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      alert('حدث خطأ أثناء إنشاء نية الدفع. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-32">
      <h2 className="text-2xl font-bold text-green-600 mb-6">قائمة المشاريع</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.projectid} className="bg-white p-4 mb-4 rounded-lg shadow-lg">
            <p>العنوان: {project.name}</p>
            <p>الوصف: {project.description}</p>
            <p>المبلغ المستهدف: {project.targetamount} ر.س</p>
            <p>المبلغ الذي تم جمعه: {project.raisedamount} ر.س</p>
            <p>تاريخ البدء: {new Date(project.startdate).toLocaleDateString()}</p>
            {/* حقل إدخال المبلغ وزر التبرع */}
            <div className="flex items-center space-x-4">
              <input
                type="number"
                placeholder="أدخل مبلغ التبرع"
                className="flex-1 p-2 border rounded-lg"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
              <button
                onClick={() => handleDonate(project.projectid, project.name)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                تبرع الآن
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;