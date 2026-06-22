import { useState, useEffect } from 'react';
import { getCars, deleteCar } from '../../services/api';
import { carStatuses } from '../../data/mockData';
import AddCarForm from '../forms/AddCarForm';
import EditCarForm from '../forms/EditCarForm';
import '../../styles/manage-cars.css';

function ManageCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await getCars();
      setCars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCars(); }, []);

  const handleCarAdded = () => {
    setShowAddForm(false);
    fetchCars();
  };

  const handleCarUpdated = () => {
    setEditingCar(null);
    fetchCars();
  };

  const handleDeleteCar = async (carId) => {
    if (!confirm('Are you sure you want to delete this car?')) return;
    try {
      await deleteCar(carId);
      fetchCars();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="manage-cars"><p>Loading cars...</p></div>;
  if (error) return <div className="manage-cars"><p className="error-text">Error: {error}</p></div>;

  return (
    <div className="manage-cars">
      <div className="section-header">
        <h2>Manage Cars</h2>
        <button
          className="add-button"
          onClick={() => { setShowAddForm(!showAddForm); setEditingCar(null); }}
        >
          {showAddForm ? 'Cancel' : '+ Add Car'}
        </button>
      </div>

      {showAddForm && (
        <AddCarForm
          onSubmit={handleCarAdded}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingCar && (
        <EditCarForm
          car={editingCar}
          onSubmit={handleCarUpdated}
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
            {cars.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center' }}>No cars found</td></tr>
            ) : (
              cars.map(car => (
                <tr key={car.id}>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.color}</td>
                  <td><code>{car.license_plate}</code></td>
                  <td>
                    <span className={`status-badge status-${car.status.toLowerCase().replace(' ', '-')}`}>
                      {car.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => { setEditingCar(car); setShowAddForm(false); }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteCar(car.id)}
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

export default ManageCars;
