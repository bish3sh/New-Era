import React, { useState, useRef, useEffect } from 'react';
import { Heart, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './BagsSection.css';

const BagsSection = () => {
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
      name: 'Leather Backpack 01',
      category: 'Backpacks',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
      price: '8,990.00',
      rating: 4.6,
      reviews: 58,
      isBag: true,
    },
    {
      id: 2,
      name: 'Canvas Tote Bag',
      category: 'Totes',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
      price: '4,500.00',
      rating: 4.4,
      reviews: 33,
      isBag: true,
    },
    {
      id: 3,
      name: 'Travel Duffel Bag',
      category: 'Travel',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      price: '12,490.00',
      rating: 4.8,
      reviews: 71,
      isBag: true,
    },
    {
      id: 4,
      name: 'Classic Crossbody',
      category: 'Crossbody',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
      price: '6,890.00',
      rating: 4.5,
      reviews: 45,
      isBag: true,
    },
    {
      id: 5,
      name: 'Urban Messenger Bag',
      category: 'Messenger',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
      price: '9,990.00',
      rating: 4.7,
      reviews: 62,
      isBag: true,
    },
    {
      id: 6,
      name: 'Sport Gym Bag',
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      price: '5,490.00',
      rating: 4.3,
      reviews: 29,
      isBag: true,
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

  const translateValue = -currentSlide * cardWidth;

  return (
    <section className="bags-section">
      <div className="bags-header">
        <h2>Bags Collection</h2>
        <div className="bags-nav-arrows">
          {!isMobile && (
            <>
              <button
                className="bags-arrow-btn"
                aria-label="Previous"
                onClick={handlePrev}
                disabled={currentSlide === 0}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="bags-arrow-btn"
                aria-label="Next"
                onClick={handleNext}
                disabled={currentSlide === maxSlide}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          <button className="bags-view-all-btn-header">View All</button>
        </div>
      </div>

      <div
        className={`bags-carousel-container ${isMobile ? 'bags-carousel-container--swipe' : ''}`}
        ref={containerRef}
      >
        <div
          className="bags-carousel-track"
          ref={trackRef}
          style={{
            transform: isMobile ? 'none' : `translateX(${translateValue}px)`,
          }}
        >
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div key={product.id} className="bags-card">
                <div className="bags-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="bags-image"
                  />

                  {product.isBag && <span className="bags-badge">Popular</span>}

                  <button
                    className="bags-wishlist"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={16}
                      className={`bags-wishlist-icon ${isWishlisted ? 'bags-wishlist-icon--active' : ''}`}
                    />
                  </button>

                  <div className="bags-overlay">
                    <button className="bags-quickview-btn">
                      <span>Quick View</span>
                      <ArrowRight size={14} className="bags-quickview-icon" />
                    </button>
                  </div>
                </div>

                <div className="bags-info">
                  <span className="bags-category">{product.category}</span>
                  <h3 className="bags-name">{product.name}</h3>

                  <div className="bags-rating">
                    <div className="bags-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`bags-star ${i < Math.floor(product.rating) ? 'bags-star--filled' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="bags-reviews">({product.reviews})</span>
                  </div>

                  <div className="bags-price-row">
                    <p className="bags-price">Rs. {product.price}</p>
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

export default BagsSection;