import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // دالة التعامل مع تسجيل الدخول أو التسجيل
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (isLogin) {
        // تسجيل الدخول
        response = await axios.post("http://localhost:5000/api/login", { email, password });
      } else {
        // التسجيل
        response = await axios.post("http://localhost:5000/api/register", { name: username, email, phone, password });
      }

      const { token, user } = response.data;

      // تخزين رمز المصادقة في localStorage
      localStorage.setItem('token', token);

      // التحقق من دور المستخدم
      if (user.role === "admin") {
        navigate("/admin/dashboard"); // توجيه المسؤول إلى لوحة التحكم
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول أو التسجيل");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? "تسجيل الدخول" : "التسجيل"}</h2>
        <form onSubmit={handleAuth}>
          {/* حقل اسم المستخدم */}
          {!isLogin && (
            <input
              type="text"
              placeholder="اسم المستخدم"
              className="w-full p-2 mb-4 border rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          {/* حقل البريد الإلكتروني */}
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full p-2 mb-4 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* حقل رقم الجوال */}
          {!isLogin && (
            <input
              type="tel"
              placeholder="رقم الجوال"
              className="w-full p-2 mb-4 border rounded-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          )}

          {/* حقل كلمة المرور */}
          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full p-2 mb-4 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* زر تسجيل الدخول أو التسجيل */}
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg">
            {isLogin ? "تسجيل الدخول" : "التسجيل"}
          </button>
        </form>

        {/* رابط للتبديل بين تسجيل الدخول والتسجيل */}
        <p className="mt-4 text-center">
          {isLogin ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-green-600">
            {isLogin ? "سجل هنا" : "سجل الدخول هنا"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;