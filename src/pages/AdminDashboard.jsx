import { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';
import ManageCars from '../components/admin/ManageCars';
import ManageCustomers from '../components/admin/ManageCustomers';
import ManageShipping from '../components/admin/ManageShipping';
import '../styles/dashboard.css';
import '../styles/admin-dashboard.css';

function AdminDashboard({ userRole, isLoggedIn, onLogout }) {
  const [activeSection, setActiveSection] = useState('cars');

  return (
    <div className="dashboard-wrapper">
      <Navbar userRole={userRole} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <div className="dashboard-container">
        <Sidebar 
          userRole={userRole} 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />

        <main className="dashboard-content">
          {activeSection === 'cars' && <ManageCars />}
          {activeSection === 'customers' && <ManageCustomers />}
          {activeSection === 'shipping' && <ManageShipping />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
