import React, { useState } from 'react';
import axios from 'axios';

export default function CivilianSignup() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("https://localhost:44388/api/Civilian/signup", form);
    alert("Signup successful!");
  } catch (error) {
    if (error.response && error.response.data) {
      alert("Error: " + error.response.data);
    } else {
      alert("Signup failed. Check console for details.");
      console.error(error);
    }
  }
};

  return (
    <div className="container">
      <h2>Civilian Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required /><br />
        <input name="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="phone" placeholder="Phone" onChange={handleChange} required /><br />
        <input name="address" placeholder="Address" onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
