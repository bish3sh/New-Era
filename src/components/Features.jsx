import React, { useState, useRef, useEffect } from 'react';
import { Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import './Features.css';

const Features = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  const products = [
    {
      id: 1,
      name: 'Adidas 01-F22',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      price: '14,990.00',
      isNew: true,
    },
    {
      id: 2,
      name: 'Adidas 01-F23',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
      price: '14,990.00',
      isNew: true,
    },
    {
      id: 3,
      name: 'Adidas 01-F24',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
      price: '14,990.00',
      isNew: true,
    },
    {
      id: 4,
      name: 'Adidas 01-F25',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      price: '24,890.00',
      isNew: true,
    },
    {
      id: 5,
      name: 'Adidas 01-F26',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      price: '16,990.00',
      isNew: true,
    },
    {
      id: 6,
      name: 'Adidas 01-F27',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
      price: '18,490.00',
      isNew: true,
    },
  ];

  // Calculate visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 600) {
        setVisibleCards(2);
      } else if (window.innerWidth <= 900) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate card width (including gap)
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const width = container.clientWidth;
      const gap = window.innerWidth <= 600 ? 8 : (window.innerWidth <= 900 ? 10 : 12);
      const totalWidth = (width + gap) / visibleCards;
      setCardWidth(totalWidth);
    }
  }, [visibleCards]);

  const maxSlide = Math.max(0, products.length - visibleCards);

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(maxSlide, prev + 1));
  };

  // Calculate translation
  const translateValue = -currentSlide * cardWidth;

  return (
    <section className="features-section">
      <div className="features-header">
        <h2>All Products</h2>
        <div className="nav-arrows">
          <button
            className="arrow-btn"
            aria-label="Previous"
            onClick={handlePrev}
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="arrow-btn"
            aria-label="Next"
            onClick={handleNext}
            disabled={currentSlide === maxSlide}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="products-carousel-container" ref={containerRef}>
        <div
          className="products-carousel-track"
          ref={trackRef}
          style={{
            transform: `translateX(${translateValue}px)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* {product.isNew && <span className="new-badge">New</span>} */}

              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                {/* {hoveredCard === product.id && (
                  <div className="product-overlay">
                    <button className="add-to-cart-btn">Add To Cart</button>
                    <div className="action-icons">
                      <button className="icon-btn" aria-label="Add to wishlist">
                        <Heart size={20} />
                      </button>
                      <button className="icon-btn" aria-label="Share">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                )} */}
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">Rs. {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="view-all-container">
        <button className="view-all-btn">View All</button>
      </div>
    </section>
  );
};

export default Features;