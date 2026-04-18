import { useState } from 'react';
import { mockOrders, shippingStatuses } from '../../data/mockData';
import UpdateShippingForm from '../forms/UpdateShippingForm';
import '../../styles/manage-shipping.css';

function ManageShipping() {
  const [orders, setOrders] = useState(mockOrders);
  const [editingOrderId, setEditingOrderId] = useState(null);

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setEditingOrderId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'status-delivered';
      case 'In Transit':
        return 'status-in-transit';
      case 'Processing':
        return 'status-processing';
      case 'Pending':
        return 'status-pending';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="manage-shipping">
      <div className="section-header">
        <h2>📦 Shipping Status Management</h2>
        <p>Update order and shipping statuses</p>
      </div>

      <div className="shipping-cards">
        {orders.map(order => (
          <div key={order.id} className="shipping-card">
            <div className="card-header">
              <h3>{order.orderId}</h3>
              <span className={`status-badge ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="card-body">
              <p><strong>Vehicle:</strong> {order.carDetails.year} {order.carDetails.make} {order.carDetails.model}</p>
              <p><strong>Destination:</strong> {order.shippingAddress}</p>
              <p><strong>Order Date:</strong> {order.date}</p>
              <p><strong>Est. Delivery:</strong> {order.estimatedDelivery}</p>
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
                ✎ Update Status
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageShipping;
