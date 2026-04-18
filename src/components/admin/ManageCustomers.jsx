import { useState } from 'react';
import { mockCustomers } from '../../data/mockData';
import AddCustomerForm from '../forms/AddCustomerForm';
import '../../styles/manage-customers.css';

function ManageCustomers() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCustomer = (newCustomer) => {
    const customerWithId = { ...newCustomer, id: Math.max(...customers.map(c => c.id), 0) + 1, joinDate: new Date().toISOString().split('T')[0] };
    setCustomers([...customers, customerWithId]);
    setShowAddForm(false);
  };

  const handleDeleteCustomer = (customerId) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
    }
  };

  return (
    <div className="manage-customers">
      <div className="section-header">
        <h2>👥 Manage Customers</h2>
        <button 
          className="add-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '✕ Cancel' : '+ Add Customer'}
        </button>
      </div>

      {showAddForm && (
        <AddCustomerForm 
          onSubmit={handleAddCustomer}
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
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td><a href={`mailto:${customer.email}`}>{customer.email}</a></td>
                <td>{customer.phone}</td>
                <td>{customer.joinDate}</td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn">👁 View</button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageCustomers;
