import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryProjects = ({ categoryId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/category/${categoryId}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [categoryId]);

  return (
    <div>
      <h1>قائمة المشاريع</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="mt-4">
                  <progress value={project.donation_progress || 0} max="100" className="w-full"></progress>
                  <p className="text-sm text-gray-500 mt-1">{project.donation_progress || 0}% تم التبرع</p>
                </div>
                <input
                  type="number"
                  placeholder="مبلغ التبرع"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-green-500"
                />
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
                  تبرع الآن
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>لا توجد مشاريع متاحة.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProjects;
