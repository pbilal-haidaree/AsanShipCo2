import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const handleSetRole = (role) => {
    setUserRole(role);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? (
              <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/customer-dashboard'} />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} onSetRole={handleSetRole} />
            )
          }
        />

        {/* Protected Routes */}
        <Route 
          path="/customer-dashboard" 
          element={
            isLoggedIn && userRole === 'customer' ? (
              <CustomerDashboard userRole={userRole} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route 
          path="/admin-dashboard" 
          element={
            isLoggedIn && userRole === 'admin' ? (
              <AdminDashboard userRole={userRole} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
