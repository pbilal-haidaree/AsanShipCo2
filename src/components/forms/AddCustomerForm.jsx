import { useState } from 'react';
import { createCustomer } from '../../services/api';
import '../../styles/forms.css';

function AddCustomerForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createCustomer(formData);
      onSubmit();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card add-customer-form" onSubmit={handleSubmit}>
      <h3>Add New Customer</h3>

      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., John Smith" required />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g., john@example.com" required />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., +1 (555) 123-4567" required />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address *</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="e.g., 123 Main St, New York, NY" required />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Customer'}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default AddCustomerForm;
