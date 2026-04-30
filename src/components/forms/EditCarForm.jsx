import { useState } from 'react';
import { carStatuses } from '../../data/mockData';
import '../../styles/forms.css';

function EditCarForm({ car, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(car);
  const [imagePreview, setImagePreview] = useState(car.images || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Limit to 20 images
    if (files.length + imagePreview.length > 20) {
      alert('Maximum 20 images allowed per car');
      return;
    }

    const readers = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      const newPreviews = [...imagePreview, ...results];
      setImagePreview(newPreviews);
      setFormData(prev => ({
        ...prev,
        images: newPreviews
      }));
    });
  };

  const removeImage = (index) => {
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setImagePreview(newPreviews);
    setFormData(prev => ({
      ...prev,
      images: newPreviews
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.make && formData.model && formData.licensePlate) {
      onSubmit(formData);
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <form className="form-card edit-car-form">
      <h3>Edit Car</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="make">Make *</label>
          <input
            type="text"
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model *</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear() + 1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="licensePlate">License Plate *</label>
          <input
            type="text"
            id="licensePlate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {carStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="images">Car Images (up to 20 images)</label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          disabled={imagePreview.length >= 20}
          className="file-input"
        />
        <p className="file-hint">
          {imagePreview.length}/20 images
        </p>
      </div>

      {imagePreview.length > 0 && (
        <div className="image-preview-grid">
          {imagePreview.map((preview, index) => (
            <div key={index} className="image-preview-item">
              <img src={preview} alt={`Preview ${index + 1}`} />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => removeImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn-primary" onClick={handleSubmit}>
          Update Car
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditCarForm;
