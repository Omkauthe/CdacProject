import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PrisonRecordsPage = () => {
  const [prisons, setPrisons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://localhost:44388/api/PrisonRecords', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        console.log('Prison API Response:', res.data); // Debug log
        setPrisons(res.data);
      })
      .catch(() => setError('Failed to load prison records'));
  }, []);

  const filteredPrisons = prisons.filter(p =>
    !searchTerm || (p.criminalName && p.criminalName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <h2>🏛️ Prison Records</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by prisoner name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group">
        {filteredPrisons.map(p => (
          <li key={p.prisonId} className="list-group-item">
            <strong>Criminal Name:</strong> {p.criminalName || 'N/A'} |{' '}
            <strong>Prison Name:</strong> {p.prisonName} |{' '}
            <strong>Sentence:</strong> {p.sentenceYears} years |{' '}
            <strong>Release Date:</strong> {p.releaseDate}
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

export default PrisonRecordsPage;
