import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

function Login({ onLoginSuccess, onSetRole }) {
  const [selectedRole, setSelectedRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (role) => {
    if (formData.email && formData.password && role) {
      onSetRole(role);
      onLoginSuccess();
      navigate(role === 'admin' ? '/admin-dashboard' : '/customer-dashboard');
    } else {
      alert('Please fill in all fields and select a role');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <Link to="/" className="login-brand">
          <img src="/tab2.png" alt="AsanShipCo" className="login-brand-logo" />
          <span>AsanShipCo</span>
        </Link>
        <div className="login-left-content">
          <h1>Welcome back</h1>
          <p>Ship your vehicles with confidence. Sign in to track shipments, manage orders, and access your dashboard.</p>
        </div>
        <div className="login-left-footer">
          <p>Trusted by 1,000+ customers worldwide</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <div className="login-header">
            <h2>Sign in to your account</h2>
            <p>Enter your credentials to continue</p>
          </div>

          <form className="login-form" onSubmit={(e) => { e.preventDefault(); }}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="role-selection">
              <label>Sign in as</label>
              <div className="role-buttons">
                <button
                  type="button"
                  className={`role-button ${selectedRole === 'customer' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('customer')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Customer
                </button>
                <button
                  type="button"
                  className={`role-button ${selectedRole === 'admin' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('admin')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  Admin
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              onClick={() => handleLogin(selectedRole)}
            >
              Sign In
            </button>
          </form>

          <div className="demo-info">
            <div className="demo-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Demo Credentials
            </div>
            <div className="demo-row">
              <span className="demo-label">Customer</span>
              <code>customer@example.com / password</code>
            </div>
            <div className="demo-row">
              <span className="demo-label">Admin</span>
              <code>admin@example.com / password</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
