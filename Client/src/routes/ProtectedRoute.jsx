import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  let isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' || !!localStorage.getItem('token');

  // In development mode, auto-initialize admin session so routes load immediately
  if (!isAuthenticated && import.meta.env.DEV) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', 'ADMIN');
    localStorage.setItem('name', 'Admin User');
    isAuthenticated = true;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
