import { useState } from 'react';
import '../styles/image-carousel.css';

function ImageCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle case where there are no images
  if (!images || images.length === 0) {
    return (
      <div className="image-carousel">
        <div className="carousel-placeholder">
          <span>📷</span>
          <p>No images available</p>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="image-carousel">
      <div className="carousel-main">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
        />
        {images.length > 1 && (
          <>
            <button
              className="carousel-nav prev"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              ❮
            </button>
            <button
              className="carousel-nav next"
              onClick={goToNext}
              aria-label="Next image"
            >
              ❯
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="carousel-counter">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
