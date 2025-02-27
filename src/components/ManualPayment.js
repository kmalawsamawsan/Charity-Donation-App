import React, { useState } from 'react';
import axios from 'axios';

const ManualPayment = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      setMessage('يرجى إدخال مبلغ صحيح');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/payment', {
        userId: 1, // يمكنك استبدال هذا بمعرف المستخدم الفعلي
        amount: amount,
      });

      if (response.data.success) {
        setMessage('تمت عملية الدفع بنجاح!');
      } else {
        setMessage('حدث خطأ أثناء عملية الدفع.');
      }
    } catch (error) {
      setMessage('حدث خطأ في الاتصال بالخادم.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>محاكاة الدفع اليدوي</h1>
      <div>
        <label>المبلغ (ريال):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="أدخل المبلغ"
        />
      </div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'جاري المعالجة...' : 'دفع الآن'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ManualPayment;
