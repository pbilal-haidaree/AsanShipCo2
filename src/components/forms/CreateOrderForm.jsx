// Create order form. Assigns an available car to a customer with shipping address and date.
import { useState, useEffect } from 'react';
import { getCars, getCustomers, createOrder } from '../../services/api';
import '../../styles/forms.css';

function CreateOrderForm({ onSubmit, onCancel }) {
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    customer_id: '',
    car_id: '',
    shipping_address: '',
    estimated_delivery: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custData, carData] = await Promise.all([getCustomers(), getCars()]);
        setCustomers(custData);
        setCars(carData.filter(c => c.status === 'Available'));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_id || !formData.car_id || !formData.shipping_address) {
      setError('Please select a customer, a car, and enter a shipping address');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        customer_id: parseInt(formData.customer_id),
        car_id: parseInt(formData.car_id),
        shipping_address: formData.shipping_address,
      };
      if (formData.estimated_delivery) {
        payload.estimated_delivery = new Date(formData.estimated_delivery).toISOString();
      }
      await createOrder(payload);
      onSubmit();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="form-card"><p>Loading...</p></div>;

  const selectedCar = cars.find(c => c.id === parseInt(formData.car_id));

  return (
    <form className="form-card create-order-form" onSubmit={handleSubmit}>
      <h3>Assign Car to Customer</h3>

      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="customer_id">Customer *</label>
        <select id="customer_id" name="customer_id" value={formData.customer_id} onChange={handleChange} required>
          <option value="">Select a customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="car_id">Available Car *</label>
        <select id="car_id" name="car_id" value={formData.car_id} onChange={handleChange} required>
          <option value="">Select a car</option>
          {cars.map(c => (
            <option key={c.id} value={c.id}>{c.year} {c.make} {c.model} — {c.license_plate}</option>
          ))}
        </select>
        {cars.length === 0 && <p className="file-hint">No available cars. Add a car first.</p>}
      </div>

      {selectedCar && (
        <div className="selected-car-preview">
          <p><strong>{selectedCar.year} {selectedCar.make} {selectedCar.model}</strong></p>
          <p>Color: {selectedCar.color || 'N/A'} | Plate: {selectedCar.license_plate}</p>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="shipping_address">Shipping Address *</label>
        <input
          type="text"
          id="shipping_address"
          name="shipping_address"
          value={formData.shipping_address}
          onChange={handleChange}
          placeholder="e.g., 456 Oak Ave, Los Angeles, CA 90001"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="estimated_delivery">Estimated Delivery</label>
        <input
          type="date"
          id="estimated_delivery"
          name="estimated_delivery"
          value={formData.estimated_delivery}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Assigning...' : 'Assign Car'}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default CreateOrderForm;
