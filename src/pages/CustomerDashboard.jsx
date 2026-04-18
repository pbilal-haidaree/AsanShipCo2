import { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';
import OrderHistory from '../components/customer/OrderHistory';
import '../styles/dashboard.css';
import '../styles/customer-dashboard.css';

function CustomerDashboard({ userRole, isLoggedIn, onLogout }) {
  const [activeSection, setActiveSection] = useState('orders');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate fetching orders from API
    const { mockOrders } = require('../data/mockData');
    setOrders(mockOrders);
  }, []);

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
          {activeSection === 'orders' && (
            <OrderHistory orders={orders} />
          )}
        </main>
      </div>
    </div>
  );
}

export default CustomerDashboard;
