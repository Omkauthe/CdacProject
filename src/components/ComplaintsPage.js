import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const isDesignated = localStorage.getItem('isDesignated') === 'true';

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://localhost:44388/api/Complaints', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setComplaints(res.data))
    .catch(() => setError('Failed to load complaints'));
  }, []);

  const updateComplaintStatus = async (complaintId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`https://localhost:44388/api/Complaints/${complaintId}/status`, `"${newStatus}"`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const res = await axios.get('https://localhost:44388/api/Complaints', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(res.data);
    } catch {
      setError('Failed to update complaint status');
    }
  };

  return (
    <div className="container">
      <h2>📁 Complaints</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {complaints.map(c => (
          <li key={c.complaintId} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {c.dateFiled} - {c.description}
              <span className="badge bg-secondary ms-2">{c.status}</span>
            </div>
            {isDesignated && (
              <select
                className="form-select w-auto"
                value={c.status}
                onChange={(e) => updateComplaintStatus(c.complaintId, e.target.value)}
              >
                <option value="open">Open</option>
                <option value="ongoing">Ongoing</option>
                <option value="closed">Closed</option>
              </select>
            )}
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

export default ComplaintsPage;
