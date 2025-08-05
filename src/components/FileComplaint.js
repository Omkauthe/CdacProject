import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileComplaint = () => {
  const [description, setDescription] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const civilianId = localStorage.getItem('civilianId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!civilianId) {
      setError('Not authorized');
      return;
    }

    axios
      .get(`https://localhost:44388/api/Complaints/by-civilian/${civilianId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setComplaints(res.data))
      .catch(() => setError('Failed to load complaints'));
  }, [civilianId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert('Description is required');
      return;
    }

    try {
      await axios.post('https://localhost:44388/api/Complaints', {
        civilianId,
        description,
        dateFiled: new Date().toISOString().split('T')[0],
        status: 'open',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Complaint filed successfully');
      setDescription('');
      
      // Reload complaints
      const res = await axios.get(`https://localhost:44388/api/Complaints/by-civilian/${civilianId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch {
      setError('Failed to file complaint');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/civilian-login');
  };

  return (
    <div className="container mt-4">
      <h2>📝 File a New Complaint</h2>
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Describe your complaint..."
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary me-2">Submit Complaint</button>
      </form>

      <h3>📋 Your Complaints</h3>
      {complaints.length === 0 ? (
        <p>No complaints filed yet.</p>
      ) : (
        <ul className="list-group">
          {complaints.map(c => (
            <li key={c.complaintId} className="list-group-item">
              <strong>Date:</strong> {c.dateFiled} | <strong>Status:</strong> {c.status} <br />
              <strong>Description:</strong> {c.description}
            </li>
          ))}
        </ul>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-success" onClick={() => alert('Saved')}>Save</button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to Home</button>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default FileComplaint;
