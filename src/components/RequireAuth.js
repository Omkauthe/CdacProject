import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const isDesignated = localStorage.getItem('isDesignated') === 'true';

  // Not logged in?
  if (!token) {
    return <Navigate to="/police-login" />;
  }

  // Role-based restriction
  if (requiredRole === 'Designated' && !isDesignated) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RequireAuth;
