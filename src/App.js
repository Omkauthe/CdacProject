import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import CivilianLogin from './components/CivilianLogin';
import CivilianSignup from './components/CivilianSignup';
import FileComplaint from './components/FileComplaint';
import PoliceLogin from './components/PoliceLogin';
import ComplaintsPage from './components/ComplaintsPage';
import CriminalRecordsPage from './components/CriminalRecordsPage';
import IncidentReportsPage from './components/IncidentReportsPage';
import PrisonRecordsPage from './components/PrisonRecordsPage';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import PoliceDashboard from './components/PoliceDashboard';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  const officerName = localStorage.getItem('officerName');
  const role = localStorage.getItem('role'); // "Police" or "Designated"

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/police-login';
  };

  return (
    <Router>
      <div className="container mt-3">
        <nav className="nav nav-pills mb-4">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/civilian-login">Civilian Login</Link>
          <Link className="nav-link" to="/civilian-signup">Civilian Signup</Link>
          <Link className="nav-link" to="/file-complaint">File Complaint</Link>

          {!isLoggedIn && (
            <Link className="nav-link" to="/police-login">Police Login</Link>
          )}

          {isLoggedIn && (
            <>
              <Link className="nav-link" to="/police-dashboard">Dashboard</Link>

              {/* Visible to all Police */}
              {(role === 'Police' || role === 'Designated') && (
                <>
                  <Link className="nav-link" to="/complaints">Complaints</Link>
                  <Link className="nav-link" to="/criminal-records">Criminal Records</Link>
                </>
              )}

              {/* Only Designated */}
              {role === 'Designated' && (
                <>
                  <Link className="nav-link" to="/incident-reports">Incident Reports</Link>
                  <Link className="nav-link" to="/prison-records">Prison Records</Link>
                </>
              )}
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/civilian-login" element={<CivilianLogin />} />
          <Route path="/civilian-signup" element={<CivilianSignup />} />
          <Route path="/file-complaint" element={<FileComplaint />} />
          <Route path="/police-login" element={<PoliceLogin />} />

          {/* Protected Dashboard */}
          <Route path="/police-dashboard" element={
            <RequireAuth requiredRole="Police">
              <PoliceDashboard />
            </RequireAuth>
          } />

          {/* Role-based Protected Routes */}
          <Route path="/complaints" element={
            <RequireAuth requiredRole="Police">
              <ComplaintsPage />
            </RequireAuth>
          } />
          <Route path="/criminal-records" element={
            <RequireAuth requiredRole="Police">
              <CriminalRecordsPage />
            </RequireAuth>
          } />
          <Route path="/incident-reports" element={
            <RequireAuth requiredRole="Designated">
              <IncidentReportsPage />
            </RequireAuth>
          } />
          <Route path="/prison-records" element={
            <RequireAuth requiredRole="Designated">
              <PrisonRecordsPage />
            </RequireAuth>
          } />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>

        {/* Logout button at bottom center */}
        {isLoggedIn && (
          <div className="d-flex justify-content-center mt-5">
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </Router>
  );
}



export default App;
