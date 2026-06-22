import { useState } from 'react';
import { createCar, uploadCarImages } from '../../services/api';
import { carStatuses } from '../../data/mockData';
import '../../styles/forms.css';

function AddCarForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    license_plate: '',
    status: 'Available',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 10) {
      alert('Maximum 10 images allowed per upload');
      return;
    }

    setImageFiles(prev => [...prev, ...files]);

    const readers = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      setImagePreviews(prev => [...prev, ...results]);
    });
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.make || !formData.model || !formData.license_plate) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const car = await createCar(formData);
      if (imageFiles.length > 0) {
        await uploadCarImages(car.id, imageFiles);
      }
      onSubmit();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card add-car-form" onSubmit={handleSubmit}>
      <h3>Add New Car</h3>

      {error && <p className="form-error">{error}</p>}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="make">Make *</label>
          <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} placeholder="e.g., Toyota" required />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model *</label>
          <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} placeholder="e.g., Camry" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} min="1900" max={new Date().getFullYear() + 1} />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} placeholder="e.g., Blue" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="license_plate">License Plate *</label>
          <input type="text" id="license_plate" name="license_plate" value={formData.license_plate} onChange={handleChange} placeholder="e.g., ABC123" required />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            {carStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="images">Car Images (up to 10)</label>
        <input type="file" id="images" multiple accept=".jpg,.jpeg,.png,.webp" onChange={handleImageChange} disabled={imageFiles.length >= 10} className="file-input" />
        <p className="file-hint">{imageFiles.length}/10 images selected</p>
      </div>

      {imagePreviews.length > 0 && (
        <div className="image-preview-grid">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="image-preview-item">
              <img src={preview} alt={`Preview ${index + 1}`} />
              <button type="button" className="remove-image-btn" onClick={() => removeImage(index)}>x</button>
            </div>
          ))}
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Car'}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default AddCarForm;
