// UsersList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-32">
      <h2 className="text-2xl font-bold text-green-600 mb-6">قائمة المستخدمين</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="bg-white p-4 mb-4 rounded-lg shadow-lg">
            <p>الاسم: {user.name}</p>
            <p>البريد الإلكتروني: {user.email}</p>
            <p>الدور: {user.role}</p>
            <p>تاريخ الإنشاء: {new Date(user.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
