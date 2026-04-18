import '../../styles/order-history.css';

function OrderHistory({ orders }) {
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
    <div className="order-history">
      <div className="section-header">
        <h2>📋 Order History</h2>
        <p>View and track all your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id">
                  <h3>{order.orderId}</h3>
                  <p className="order-date">Ordered: {order.date}</p>
                </div>
                <div className={`order-status ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
              </div>

              <div className="order-body">
                <div className="car-details">
                  <h4>Vehicle Details</h4>
                  <p><strong>Make:</strong> {order.carDetails.make}</p>
                  <p><strong>Model:</strong> {order.carDetails.model}</p>
                  <p><strong>Year:</strong> {order.carDetails.year}</p>
                </div>

                <div className="shipping-details">
                  <h4>Shipping Information</h4>
                  <p><strong>Address:</strong> {order.shippingAddress}</p>
                  <p><strong>Est. Delivery:</strong> {order.estimatedDelivery}</p>
                </div>
              </div>

              <div className="order-footer">
                <button className="order-details-btn">View Details →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
