import React from 'react';
import { Link } from 'react-router-dom';

const PoliceDashboard = () => {
  const officerName = localStorage.getItem('officerName');
  const rank = localStorage.getItem('rank');
  const isDesignated = localStorage.getItem('isDesignated') === 'true';

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, Officer {officerName || 'Unknown'}</h2>
      <p>Rank: {rank || 'N/A'}</p>
      <p>Status: {isDesignated ? 'Designated' : 'Non-Designated'}</p>

      <hr />
      <h3>Dashboard Sections</h3>
      <ul>
        <li><Link to="/complaints">📁 Complaints</Link></li>
        <li><Link to="/criminal-records">🔎 Criminal Records</Link></li>
        {isDesignated && (
          <>
            <li><Link to="/incident-reports">📋 Incident Reports</Link></li>
            <li><Link to="/prison-records">🏛️ Prison Records</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default PoliceDashboard;
