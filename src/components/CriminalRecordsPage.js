import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CriminalRecordsPage = () => {
  const [criminals, setCriminals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://localhost:44388/api/Criminals', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCriminals(res.data))
    .catch(() => setError('Failed to load criminal records'));
  }, []);

  const filteredCriminals = criminals.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>🔎 Criminal Records</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group">
        {filteredCriminals.map(c => (
          <li key={c.criminalId} className="list-group-item">
            <strong>Name:</strong> {c.name} | <strong>Age:</strong> {c.age} | <strong>Gender:</strong> {c.gender} | <strong>Address:</strong> {c.address} | <strong>Arrest Date:</strong> {c.arrestDate} | <strong>Crime:</strong> {c.crimeCommitted}
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-success" onClick={() => alert('Saved')}>Save</button>
        <button className="btn btn-secondary" onClick={() => navigate('/police-dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default CriminalRecordsPage;
