import React, { useState, useRef, useEffect } from 'react';
import { Heart, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './Features.css';

const Features = () => {
  const [wishlist, setWishlist] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  const products = [
    {
      id: 1,
      name: 'Adidas 01-F22',
      category: 'Sneakers',
      image: 'https://images.unsplash.com/photo-1605732440685-d0654d81aa30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '14,990.00',
      rating: 4.6,
      reviews: 82,
      isNew: true,
    },
    {
      id: 2,
      name: 'Adidas 01-F23',
      category: 'Sneakers',
      image: 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?q=80&w=1190&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '14,990.00',
      rating: 4.8,
      reviews: 47,
      isNew: true,
    },
    {
      id: 3,
      name: 'Adidas 01-F24',
      category: 'Running',
      image: 'https://images.unsplash.com/photo-1631087606988-a6be38fccaf6?q=80&w=1127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '14,990.00',
      rating: 4.5,
      reviews: 63,
      isNew: true,
    },
    {
      id: 4,
      name: 'Adidas 01-F25',
      category: 'Running',
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '24,890.00',
      rating: 4.9,
      reviews: 128,
      isNew: true,
    },
    {
      id: 5,
      name: 'Adidas 01-F26',
      category: 'Lifestyle',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      price: '16,990.00',
      rating: 4.4,
      reviews: 35,
      isNew: true,
    },
    {
      id: 6,
      name: 'Adidas 01-F27',
      category: 'Lifestyle',
      image: 'https://images.unsplash.com/photo-1534653299134-96a171b61581?q=80&w=975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '18,490.00',
      rating: 4.7,
      reviews: 91,
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
      // Below 600px the carousel becomes a native swipeable strip —
      // no arrow buttons, no JS-driven transform, just finger scrolling.
      setIsMobile(window.innerWidth <= 600);
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

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

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
        <h2>New Arrivals</h2>
        <div className="nav-arrows">
          {!isMobile && (
            <>
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
            </>
          )}
          <button className="view-all-btn-header">View All</button>
        </div>
      </div>

      <div
        className={`products-carousel-container ${isMobile ? 'products-carousel-container--swipe' : ''}`}
        ref={containerRef}
      >
        <div
          className="products-carousel-track"
          ref={trackRef}
          style={{
            transform: isMobile ? 'none' : `translateX(${translateValue}px)`,
          }}
        >
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />

                  {product.isNew && <span className="new-badge">New</span>}

                  <button
                    className="product-wishlist"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={16}
                      className={`product-wishlist-icon ${isWishlisted ? 'product-wishlist-icon--active' : ''}`}
                    />
                  </button>

                  <div className="product-overlay">
                    <button className="product-quickview-btn">
                      <span>Quick View</span>
                      <ArrowRight size={14} className="product-quickview-icon" />
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>

                  <div className="product-rating">
                    <div className="product-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`product-star ${i < Math.floor(product.rating) ? 'product-star--filled' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="product-reviews">({product.reviews})</span>
                  </div>

                  <div className="product-price-row">
                    <p className="product-price">Rs. {product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;