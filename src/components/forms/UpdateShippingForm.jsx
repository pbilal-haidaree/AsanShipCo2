import { useState } from 'react';
import '../../styles/forms.css';

function UpdateShippingForm({ order, onSubmit, onCancel, statuses }) {
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedStatus);
  };

  return (
    <form className="form-inline update-shipping-form">
      <div className="form-group inline">
        <label htmlFor="status">Update Status:</label>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="form-actions inline">
        <button type="submit" className="btn-small-primary" onClick={handleSubmit}>
          Save
        </button>
        <button type="button" className="btn-small-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UpdateShippingForm;
