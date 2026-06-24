// Customer car browser. Shows available vehicles in a responsive grid with image carousels.
import { useState, useEffect } from 'react';
import { getAvailableCars, imageUrl } from '../../services/api';
import ImageCarousel from '../ImageCarousel';
import '../../styles/browse-cars.css';

function BrowseCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAvailableCars();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) return <div className="browse-cars"><p>Loading available cars...</p></div>;
  if (error) return <div className="browse-cars"><p className="error-text">Error: {error}</p></div>;

  return (
    <div className="browse-cars">
      <div className="section-header">
        <h2>Available Cars</h2>
        <p>Browse cars available for shipping. Contact us to place an order.</p>
      </div>

      {cars.length === 0 ? (
        <div className="empty-state">
          <p>No cars available at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="cars-grid">
          {cars.map(car => {
            const carImages = (car.images || []).map(p => imageUrl(p));
            return (
              <div key={car.id} className="car-card">
                <div className="car-card-images">
                  {carImages.length > 0 ? (
                    <ImageCarousel images={carImages} />
                  ) : (
                    <div className="car-no-image">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                        <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                        <path d="M5 17H3v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0H9"/>
                      </svg>
                      <span>No images</span>
                    </div>
                  )}
                </div>
                <div className="car-card-body">
                  <h3>{car.year} {car.make} {car.model}</h3>
                  <div className="car-card-details">
                    {car.color && <span className="car-detail">Color: {car.color}</span>}
                    <span className="car-detail">Plate: {car.license_plate}</span>
                  </div>
                  <span className="status-badge status-available">Available</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BrowseCars;
