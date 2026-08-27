import React, { useState, useRef, useEffect } from 'react';
import { Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import './BagsSection.css';

const BagsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  const products = [
    {
      id: 1,
      name: 'Leather Backpack 01',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
      price: '8,990.00',
      isBag: true,
    },
    {
      id: 2,
      name: 'Canvas Tote Bag',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
      price: '4,500.00',
      isBag: true,
    },
    {
      id: 3,
      name: 'Travel Duffel Bag',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      price: '12,490.00',
      isBag: true,
    },
    {
      id: 4,
      name: 'Classic Crossbody',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
      price: '6,890.00',
      isBag: true,
    },
    {
      id: 5,
      name: 'Urban Messenger Bag',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
      price: '9,990.00',
      isBag: true,
    },
    {
      id: 6,
      name: 'Sport Gym Bag',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      price: '5,490.00',
      isBag: true,
    },
  ];

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

  const translateValue = -currentSlide * cardWidth;

  return (
    <section className="bags-section">
      <div className="bags-header">
        <h2>Bags Collection</h2>
        <div className="bags-nav-arrows">
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
        </div>
      </div>

      <div className="bags-carousel-container" ref={containerRef}>
        <div
          className="bags-carousel-track"
          ref={trackRef}
          style={{
            transform: `translateX(${translateValue}px)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="bags-card"
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* {product.isBag && <span className="bags-badge">Popular</span>} */}

              <div className="bags-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="bags-image"
                />

                {/* {hoveredCard === product.id && (
                  <div className="bags-overlay">
                    <button className="bags-add-to-cart-btn">Add To Cart</button>
                    <div className="bags-action-icons">
                      <button className="bags-icon-btn" aria-label="Add to wishlist">
                        <Heart size={20} />
                      </button>
                      <button className="bags-icon-btn" aria-label="Share">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                )} */}
              </div>

              <div className="bags-info">
                <h3 className="bags-name">{product.name}</h3>
                <p className="bags-price">Rs. {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bags-view-all-container">
        <button className="bags-view-all-btn">View All </button>
      </div>
    </section>
  );
};

export default BagsSection;