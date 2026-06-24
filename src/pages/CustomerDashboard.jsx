// Customer dashboard. Sidebar navigation for browsing available cars and viewing order history.
import { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';
import BrowseCars from '../components/customer/BrowseCars';
import OrderHistory from '../components/customer/OrderHistory';
import Contact from '../components/Contact';
import { getOrders } from '../services/api';
import '../styles/dashboard.css';
import '../styles/customer-dashboard.css';

function CustomerDashboard({ userRole, isLoggedIn, onLogout }) {
  const [activeSection, setActiveSection] = useState('browse');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (activeSection === 'browse') return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [activeSection]);

  const getFilteredOrders = () => {
    if (activeSection === 'all') return orders;

    const statusMap = {
      'pending': 'Pending',
      'in-process': 'In Transit',
      'delivered': 'Delivered'
    };

    return orders.filter(order => order.status === statusMap[activeSection]);
  };

  const filteredOrders = getFilteredOrders();
  const statusLabels = {
    'all': 'All Orders',
    'pending': 'Pending Orders',
    'in-process': 'Orders In Process',
    'delivered': 'Delivered Orders'
  };

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
          {activeSection === 'browse' ? (
            <BrowseCars />
          ) : loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error-text">Error: {error}</p>
          ) : (
            <OrderHistory
              orders={filteredOrders}
              title={statusLabels[activeSection]}
              status={activeSection === 'all' ? null : activeSection}
            />
          )}
        </main>
      </div>

      <Contact compact={true} />
    </div>
  );
}

export default CustomerDashboard;
