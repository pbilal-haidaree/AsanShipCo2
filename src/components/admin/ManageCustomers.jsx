// Admin customer management. Lists, adds, and deletes customer records via API.
import { useState, useEffect } from 'react';
import { getCustomers, deleteCustomer } from '../../services/api';
import AddCustomerForm from '../forms/AddCustomerForm';
import '../../styles/manage-customers.css';

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleCustomerAdded = () => {
    setShowAddForm(false);
    fetchCustomers();
  };

  const handleDeleteCustomer = async (customerId) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    try {
      await deleteCustomer(customerId);
      fetchCustomers();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="manage-customers"><p>Loading customers...</p></div>;
  if (error) return <div className="manage-customers"><p className="error-text">Error: {error}</p></div>;

  return (
    <div className="manage-customers">
      <div className="section-header">
        <h2>Manage Customers</h2>
        <button
          className="add-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add Customer'}
        </button>
      </div>

      {showAddForm && (
        <AddCustomerForm
          onSubmit={handleCustomerAdded}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="customers-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>No customers found</td></tr>
            ) : (
              customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td><a href={`mailto:${customer.email}`}>{customer.email}</a></td>
                  <td>{customer.phone}</td>
                  <td>{new Date(customer.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageCustomers;
