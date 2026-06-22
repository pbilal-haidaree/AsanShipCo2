import { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';
import OrderHistory from '../components/customer/OrderHistory';
import Contact from '../components/Contact';
import { getOrders } from '../services/api';
import '../styles/dashboard.css';
import '../styles/customer-dashboard.css';

function CustomerDashboard({ userRole, isLoggedIn, onLogout }) {
  const [activeSection, setActiveSection] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
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
  }, []);

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
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error-text">Error: {error}</p>
          ) : (
            (activeSection === 'all' || activeSection === 'pending' || activeSection === 'in-process' || activeSection === 'delivered') && (
              <OrderHistory
                orders={filteredOrders}
                title={statusLabels[activeSection]}
                status={activeSection === 'all' ? null : activeSection}
              />
            )
          )}
        </main>
      </div>

      <Contact compact={true} />
    </div>
  );
}

export default CustomerDashboard;
