import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar({ userRole, isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <span className="brand-icon">🚚</span>
            <span className="brand-name">AsanShipCo</span>
          </Link>
        </div>

        <div className="navbar-menu">
          {!isLoggedIn ? (
            <Link to="/login" className="navbar-button login-btn">
              Login
            </Link>
          ) : (
            <>
              <span className="user-role">{userRole === 'admin' ? '👤 Admin' : '👤 Customer'}</span>
              <button className="navbar-button logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
