import React, { useState, useRef, useEffect } from 'react';
import { Heart, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './TopSelling.css';

const TopSelling = () => {
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
      image: 'https://images.unsplash.com/photo-1605733513549-de9b150bd70d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '14,990.00',
      rating: 4.7,
      reviews: 143,
      isTopSelling: true,
    },
    {
      id: 2,
      name: 'Adidas 01-F23',
      category: 'Sneakers',
      image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '14,990.00',
      rating: 4.6,
      reviews: 98,
      isTopSelling: true,
    },
    {
      id: 3,
      name: 'Adidas 01-F24',
      category: 'Running',
      image: 'https://images.unsplash.com/photo-1662138679794-110b0cba27b9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '14,990.00',
      rating: 4.9,
      reviews: 211,
      isTopSelling: true,
    },
    {
      id: 4,
      name: 'Adidas 01-F25',
      category: 'Running',
      image: 'https://images.unsplash.com/photo-1522056683100-34f2f60f0094?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '24,890.00',
      rating: 4.8,
      reviews: 176,
      isTopSelling: true,
    },
    {
      id: 5,
      name: 'Adidas 01-F26',
      category: 'Lifestyle',
      image: 'https://images.unsplash.com/photo-1584473457417-bd0afe798ae1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '16,990.00',
      rating: 4.5,
      reviews: 67,
      isTopSelling: true,
    },
    {
      id: 6,
      name: 'Adidas 01-F27',
      category: 'Lifestyle',
      image: 'https://images.unsplash.com/photo-1741783895531-ccc860eb946a?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '18,490.00',
      rating: 4.6,
      reviews: 84,
      isTopSelling: true,
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
    <section className="top-selling-section">
      <div className="top-selling-header">
        <h2>Top Selling</h2>
        <div className="top-selling-nav-arrows">
          {!isMobile && (
            <>
              <button
                className="top-selling-arrow-btn"
                aria-label="Previous"
                onClick={handlePrev}
                disabled={currentSlide === 0}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="top-selling-arrow-btn"
                aria-label="Next"
                onClick={handleNext}
                disabled={currentSlide === maxSlide}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          <button className="top-selling-view-all-btn-header">View All</button>
        </div>
      </div>

      <div
        className={`top-selling-carousel-container ${isMobile ? 'top-selling-carousel-container--swipe' : ''}`}
        ref={containerRef}
      >
        <div
          className="top-selling-carousel-track"
          ref={trackRef}
          style={{
            transform: isMobile ? 'none' : `translateX(${translateValue}px)`,
          }}
        >
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div key={product.id} className="top-selling-card">
                <div className="top-selling-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="top-selling-image"
                  />

                  {product.isTopSelling && <span className="top-selling-badge">Best Seller</span>}

                  <button
                    className="top-selling-wishlist"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={16}
                      className={`top-selling-wishlist-icon ${isWishlisted ? 'top-selling-wishlist-icon--active' : ''}`}
                    />
                  </button>

                  <div className="top-selling-overlay">
                    <button className="top-selling-quickview-btn">
                      <span>Quick View</span>
                      <ArrowRight size={14} className="top-selling-quickview-icon" />
                    </button>
                  </div>
                </div>

                <div className="top-selling-info">
                  <span className="top-selling-category">{product.category}</span>
                  <h3 className="top-selling-name">{product.name}</h3>

                  <div className="top-selling-rating">
                    <div className="top-selling-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`top-selling-star ${i < Math.floor(product.rating) ? 'top-selling-star--filled' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="top-selling-reviews">({product.reviews})</span>
                  </div>

                  <div className="top-selling-price-row">
                    <p className="top-selling-price">Rs. {product.price}</p>
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

export default TopSelling;