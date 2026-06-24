// Top navigation bar. Brand logo, sign-in/sign-out controls, and responsive hamburger menu.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar({ userRole, isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setMobileOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/tab2.png" alt="AsanShipCo" className="brand-logo" />
          <span className="brand-name">AsanShipCo</span>
        </Link>

        <button
          className={`navbar-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="navbar-button login-btn"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
          ) : (
            <>
              <span className="user-role">
                {userRole === 'admin' ? 'Admin' : 'Customer'}
              </span>
              <button className="navbar-button logout-btn" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
