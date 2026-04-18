import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    // Simulate login - in a real app, this would call an API
    if (formData.email && formData.password && role) {
      onSetRole(role);
      onLoginSuccess();
      navigate(role === 'admin' ? '/admin-dashboard' : '/customer-dashboard');
    } else {
      alert('Please fill in all fields and select a role');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🚚 AsanShipCo</h1>
          <p>Welcome Back</p>
        </div>

        <form className="login-form" onSubmit={(e) => { e.preventDefault(); }}>
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Input */}
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
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div className="role-selection">
            <label>Login As:</label>
            <div className="role-buttons">
              <button
                type="button"
                className={`role-button ${selectedRole === 'customer' ? 'active' : ''}`}
                onClick={() => setSelectedRole('customer')}
              >
                👤 Customer
              </button>
              <button
                type="button"
                className={`role-button ${selectedRole === 'admin' ? 'active' : ''}`}
                onClick={() => setSelectedRole('admin')}
              >
                🔐 Admin
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
            onClick={() => handleLogin(selectedRole)}
          >
            Login
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="demo-info">
          <p className="demo-title">Demo Credentials:</p>
          <div className="demo-row">
            <strong>Customer:</strong> <span>customer@example.com / password</span>
          </div>
          <div className="demo-row">
            <strong>Admin:</strong> <span>admin@example.com / password</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
