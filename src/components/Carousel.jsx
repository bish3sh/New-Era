import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';


function CarouselCard({ image, title, subtitle }) {

  return (
    <div className="carousel-card">
      <div className="carousel-card-image" style={{ backgroundImage: `url(${image})` }}>
        <div className="carousel-card-overlay">
          <h2>{title}</h2>
          {subtitle && <p className="carousel-meta">{subtitle}</p>}
          <div className="carousel-actions">
            <button className="shop-btn">Shop Now</button>
            <button className="view-more-btn">View More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Carousel({ slides = [], autoPlay = true, autoPlayInterval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!slides || slides.length === 0) {
    return <div className="carousel">No slides available</div>;
  }

  return (
    <div className="carousel">
      {/* Slides */}
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <CarouselCard
              image={slide.image}
              title={slide.title}
              subtitle={slide.year}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button className="carousel-btn carousel-btn-prev" onClick={goToPrevious}>
        <ChevronLeft size={32} />
      </button>
      <button className="carousel-btn carousel-btn-next" onClick={goToNext}>
        <ChevronRight size={32} />
      </button>

      {/* Indicators/Dots */}
      {/* <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}

      {/* Slide Counter */}
      {/* <div className="carousel-counter">
        {currentIndex + 1} / {slides.length}
      </div> */}
    </div>
  );
}

export default Carousel;