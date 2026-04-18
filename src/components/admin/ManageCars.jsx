import { useState } from 'react';
import { mockCars, carStatuses } from '../../data/mockData';
import AddCarForm from '../forms/AddCarForm';
import EditCarForm from '../forms/EditCarForm';
import '../../styles/manage-cars.css';

function ManageCars() {
  const [cars, setCars] = useState(mockCars);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  const handleAddCar = (newCar) => {
    const carWithId = { ...newCar, id: Math.max(...cars.map(c => c.id), 0) + 1 };
    setCars([...cars, carWithId]);
    setShowAddForm(false);
  };

  const handleUpdateCar = (updatedCar) => {
    setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
    setEditingCar(null);
  };

  const handleDeleteCar = (carId) => {
    if (confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter(car => car.id !== carId));
    }
  };

  return (
    <div className="manage-cars">
      <div className="section-header">
        <h2>🚗 Manage Cars</h2>
        <button 
          className="add-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '✕ Cancel' : '+ Add Car'}
        </button>
      </div>

      {showAddForm && (
        <AddCarForm 
          onSubmit={handleAddCar}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingCar && (
        <EditCarForm 
          car={editingCar}
          onSubmit={handleUpdateCar}
          onCancel={() => setEditingCar(null)}
        />
      )}

      <div className="cars-table">
        <table>
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
              <th>License Plate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id}>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.color}</td>
                <td><code>{car.licensePlate}</code></td>
                <td>
                  <span className={`status-badge status-${car.status.toLowerCase().replace(' ', '-')}`}>
                    {car.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => setEditingCar(car)}
                    >
                      ✎ Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteCar(car.id)}
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

export default ManageCars;
