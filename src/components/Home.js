import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container">
      <h1>E-Police Connect System</h1>
      <Link to="/civilian-login" className="btn btn-primary m-2">Civilian Login</Link>
      <Link to="/civilian-signup" className="btn btn-success m-2">Civilian Signup</Link>
      <Link to="/police-login" className="btn btn-secondary m-2">Police Login</Link>
    </div>
  );
}
