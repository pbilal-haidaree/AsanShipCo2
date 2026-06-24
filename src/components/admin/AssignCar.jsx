import { useState } from 'react';
import CreateOrderForm from '../forms/CreateOrderForm';
import '../../styles/manage-shipping.css';

function AssignCar() {
  const [showForm, setShowForm] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const handleOrderCreated = () => {
    setSuccessMessage('Car assigned successfully! You can view it in the Shipping tab.');
    setShowForm(false);
  };

  const handleNewAssignment = () => {
    setSuccessMessage('');
    setShowForm(true);
  };

  return (
    <div className="assign-car">
      <div className="section-header">
        <div>
          <h2>Assign Car to Customer</h2>
          <p>Select a customer and an available car to create a shipping order</p>
        </div>
      </div>

      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
          <button className="add-button" onClick={handleNewAssignment}>
            + Assign Another Car
          </button>
        </div>
      )}

      {showForm && (
        <CreateOrderForm
          onSubmit={handleOrderCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      {!showForm && !successMessage && (
        <button className="add-button" onClick={() => setShowForm(true)}>
          + Assign a Car
        </button>
      )}
    </div>
  );
}

export default AssignCar;
