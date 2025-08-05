import React, { useState } from 'react';
import axios from 'axios';

const CivilianLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://localhost:44388/api/auth/login-civilian', {
        email,
        password
      });

      const { token, fullName, civilianId } = res.data;

      localStorage.setItem('token', token);               // Stores auth token
      localStorage.setItem('civilianName', fullName);     // Stores auth token
      localStorage.setItem('civilianId', civilianId);     // Stores name (optional but helpful)

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      alert('Civilian login successful!');
      window.location.href = '/file-complaint';
    } catch (err) {
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Civilian Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default CivilianLogin;
