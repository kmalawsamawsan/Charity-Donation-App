// EventsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-32">
      <h2 className="text-2xl font-bold text-green-600 mb-6">قائمة الأحداث</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="bg-white p-4 mb-4 rounded-lg shadow-lg">
            <p>العنوان: {event.title}</p>
            <p>الوصف: {event.description}</p>
            <p>تاريخ الحدث: {new Date(event.event_date).toLocaleDateString()}</p>
            <p>تاريخ الإنشاء: {new Date(event.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
