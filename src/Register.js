import React, { useState } from 'react';
import { registerUser } from './registerUser';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, userData);
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {/* أضف حقول إضافية لبيانات المستخدم هنا */}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
