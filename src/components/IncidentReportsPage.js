import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncidentReportsPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://localhost:44388/api/IncidentReports', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setIncidents(res.data))
    .catch(() => setError('Failed to load incident reports'));
  }, []);

  return (
    <div className="container">
      <h2>📋 Incident Reports</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {incidents.map(i => (
          <li key={i.reportId} className="list-group-item">
            <strong>Location:</strong> {i.location} | <strong>Description:</strong> {i.description} | <strong>Report Date:</strong> {i.reportDate} | <strong>Officer:</strong> {i.officerName || 'N/A'}
          </li>
        ))}
      </ul>
      <div className="mt-4">
  <button className="btn btn-success me-2" onClick={() => alert('Saved')}>Save</button>
  <button className="btn btn-secondary" onClick={() => window.location.href = '/police-dashboard'}>Back</button>
</div>

    </div>
  );
};

export default IncidentReportsPage;
