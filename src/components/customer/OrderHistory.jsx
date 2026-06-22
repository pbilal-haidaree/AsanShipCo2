import { imageUrl } from '../../services/api';
import ImageCarousel from '../ImageCarousel';
import '../../styles/order-history.css';

function OrderHistory({ orders, title = 'Order History', status }) {
  const getStatusColor = (orderStatus) => {
    switch (orderStatus) {
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

  return (
    <div className="order-history">
      <div className="section-header">
        <h2>{title}</h2>
        <p>View and track all your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map(order => {
            const car = order.car || {};
            const carImages = (car.images || []).map(p => imageUrl(p));

            return (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">Ordered: {formatDate(order.order_date)}</p>
                  </div>
                  <div className={`order-status ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="order-body">
                  <div className="car-carousel-section">
                    <h4>Vehicle Images</h4>
                    <ImageCarousel images={carImages} />
                  </div>

                  <div className="car-details">
                    <h4>Vehicle Details</h4>
                    <p><strong>Make:</strong> {car.make || 'N/A'}</p>
                    <p><strong>Model:</strong> {car.model || 'N/A'}</p>
                    <p><strong>Year:</strong> {car.year || 'N/A'}</p>
                  </div>

                  <div className="shipping-details">
                    <h4>Shipping Information</h4>
                    <p><strong>Address:</strong> {order.shipping_address}</p>
                    <p><strong>Est. Delivery:</strong> {formatDate(order.estimated_delivery)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
