import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar({ userRole, activeSection, onSectionChange }) {
  const adminSections = [
    { id: 'cars', label: '🚗 Manage Cars', icon: '🚗' },
    { id: 'customers', label: '👥 Manage Customers', icon: '👥' },
    { id: 'shipping', label: '📦 Shipping Status', icon: '📦' }
  ];

  const customerSections = [
    { id: 'all', label: '📋 All Orders', icon: '📋' },
    { id: 'pending', label: '⏳ Pending', icon: '⏳' },
    { id: 'in-process', label: '🚚 In Process', icon: '🚚' },
    { id: 'delivered', label: '✅ Delivered', icon: '✅' }
  ];

  const sections = userRole === 'admin' ? adminSections : customerSections;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>{userRole === 'admin' ? '🎯 Admin Panel' : '📊 Dashboard'}</h2>
      </div>

      <nav className="sidebar-nav">
        {sections.map(section => (
          <button
            key={section.id}
            className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionChange(section.id)}
          >
            <span className="section-icon">{section.icon}</span>
            <span className="section-label">{section.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-text">AsanShipCo © 2024</p>
      </div>
    </aside>
  );
}

export default Sidebar;
