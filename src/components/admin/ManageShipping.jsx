import { useState, useEffect } from 'react';
import { getOrders, updateOrder } from '../../services/api';
import { shippingStatuses } from '../../data/mockData';
import UpdateShippingForm from '../forms/UpdateShippingForm';
import '../../styles/manage-shipping.css';

function ManageShipping() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingOrderId, setEditingOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, { status: newStatus });
      setEditingOrderId(null);
      fetchOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'status-delivered';
      case 'In Transit': return 'status-in-transit';
      case 'Processing': return 'status-processing';
      case 'Pending': return 'status-pending';
      default: return 'status-default';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString();
  };

  if (loading) return <div className="manage-shipping"><p>Loading orders...</p></div>;
  if (error) return <div className="manage-shipping"><p className="error-text">Error: {error}</p></div>;

  return (
    <div className="manage-shipping">
      <div className="section-header">
        <h2>Shipping Status Management</h2>
        <p>Update order and shipping statuses</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state"><p>No orders found</p></div>
      ) : (
        <div className="shipping-cards">
          {orders.map(order => (
            <div key={order.id} className="shipping-card">
              <div className="card-header">
                <h3>Order #{order.id}</h3>
                <span className={`status-badge ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="card-body">
                <p><strong>Vehicle:</strong> {order.car ? `${order.car.year} ${order.car.make} ${order.car.model}` : `Car #${order.car_id}`}</p>
                <p><strong>Customer:</strong> {order.customer ? order.customer.name : `Customer #${order.customer_id}`}</p>
                <p><strong>Destination:</strong> {order.shipping_address}</p>
                <p><strong>Order Date:</strong> {formatDate(order.order_date)}</p>
                <p><strong>Est. Delivery:</strong> {formatDate(order.estimated_delivery)}</p>
              </div>

              {editingOrderId === order.id ? (
                <UpdateShippingForm
                  order={order}
                  onSubmit={(newStatus) => handleUpdateStatus(order.id, newStatus)}
                  onCancel={() => setEditingOrderId(null)}
                  statuses={shippingStatuses}
                />
              ) : (
                <button
                  className="update-btn"
                  onClick={() => setEditingOrderId(order.id)}
                >
                  Update Status
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageShipping;
