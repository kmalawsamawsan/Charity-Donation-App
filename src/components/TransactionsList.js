// TransactionsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-32">
      <h2 className="text-2xl font-bold text-green-600 mb-6">قائمة المعاملات</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="bg-white p-4 mb-4 rounded-lg shadow-lg">
            <p>طريقة الدفع: {transaction.payment_method}</p>
            <p>حالة الدفع: {transaction.status}</p>
            <p>تاريخ الإنشاء: {new Date(transaction.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
