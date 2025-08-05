import React, { useState } from 'react';
import axios from 'axios';

const PoliceLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://localhost:44388/api/auth/login-officer', {
        email,
        password
      });

       const { token, name, officerId, rank, isDesignated } = res.data;

      // ✅ Store token & officer details correctly
      localStorage.setItem('token', token);
      localStorage.setItem('officerName', name);
      localStorage.setItem('officerId', officerId);
      localStorage.setItem('rank', rank);
      localStorage.setItem('isDesignated', isDesignated.toString());

      // Set default auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      alert('Police login successful!');
      window.location.href = '/police-dashboard'; // or route of your choice
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
   <form className="p-4 border rounded shadow" onSubmit={handleLogin}>
  <h2 className="mb-4">Police Login</h2>
  <input
    type="email"
    className="form-control mb-3"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <input
    type="password"
    className="form-control mb-3"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <button type="submit" className="btn btn-primary">Login</button>
</form>

  );
};

export default PoliceLogin;
