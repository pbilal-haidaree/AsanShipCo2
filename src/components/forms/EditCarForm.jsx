// Edit car form. Updates an existing car's details and manages its uploaded images.
import { useState } from 'react';
import { updateCar, uploadCarImages, deleteCarImage, imageUrl } from '../../services/api';
import { carStatuses } from '../../data/mockData';
import '../../styles/forms.css';

function EditCarForm({ car, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    make: car.make,
    model: car.model,
    year: car.year,
    color: car.color || '',
    license_plate: car.license_plate,
    status: car.status,
  });
  const [existingImages, setExistingImages] = useState(car.images || []);
  const [newFiles, setNewFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);
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
    const total = existingImages.length + newFiles.length + files.length;
    if (total > 10) {
      alert('Maximum 10 images allowed per car');
      return;
    }

    setNewFiles(prev => [...prev, ...files]);

    const readers = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      setNewPreviews(prev => [...prev, ...results]);
    });
  };

  const removeExistingImage = async (imgPath) => {
    const filename = imgPath.split('/').pop();
    try {
      await deleteCarImage(car.id, filename);
      setExistingImages(prev => prev.filter(p => p !== imgPath));
    } catch (err) {
      alert(err.message);
    }
  };

  const removeNewImage = (index) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => prev.filter((_, i) => i !== index));
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
      await updateCar(car.id, formData);
      if (newFiles.length > 0) {
        await uploadCarImages(car.id, newFiles);
      }
      onSubmit();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card edit-car-form" onSubmit={handleSubmit}>
      <h3>Edit Car</h3>

      {error && <p className="form-error">{error}</p>}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="edit-make">Make *</label>
          <input type="text" id="edit-make" name="make" value={formData.make} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="edit-model">Model *</label>
          <input type="text" id="edit-model" name="model" value={formData.model} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="edit-year">Year</label>
          <input type="number" id="edit-year" name="year" value={formData.year} onChange={handleChange} min="1900" max={new Date().getFullYear() + 1} />
        </div>
        <div className="form-group">
          <label htmlFor="edit-color">Color</label>
          <input type="text" id="edit-color" name="color" value={formData.color} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="edit-license_plate">License Plate *</label>
          <input type="text" id="edit-license_plate" name="license_plate" value={formData.license_plate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="edit-status">Status</label>
          <select id="edit-status" name="status" value={formData.status} onChange={handleChange}>
            {carStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="edit-images">Add Images ({existingImages.length + newFiles.length}/10)</label>
        <input type="file" id="edit-images" multiple accept=".jpg,.jpeg,.png,.webp" onChange={handleImageChange} disabled={existingImages.length + newFiles.length >= 10} className="file-input" />
      </div>

      {(existingImages.length > 0 || newPreviews.length > 0) && (
        <div className="image-preview-grid">
          {existingImages.map((imgPath, index) => (
            <div key={`existing-${index}`} className="image-preview-item">
              <img src={imageUrl(imgPath)} alt={`Car image ${index + 1}`} />
              <button type="button" className="remove-image-btn" onClick={() => removeExistingImage(imgPath)}>x</button>
            </div>
          ))}
          {newPreviews.map((preview, index) => (
            <div key={`new-${index}`} className="image-preview-item">
              <img src={preview} alt={`New image ${index + 1}`} />
              <button type="button" className="remove-image-btn" onClick={() => removeNewImage(index)}>x</button>
            </div>
          ))}
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update Car'}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default EditCarForm;
