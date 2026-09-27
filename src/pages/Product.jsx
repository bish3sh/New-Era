import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Truck, Check, ChevronRight, ChevronDown, ArrowRight, ThumbsUp, ThumbsDown, BadgeCheck } from 'lucide-react';
import './Product.css';

const product = {
  brand: 'Reebok',
  sku: 'HR1325ROO-.-8',
  name: 'Shoes Reebok Zig Kinetica 3',
  rating: 4,
  reviews: 42,
  price: 1500,
  breadcrumb: ['Clothes and shoes', 'Shoes', 'Reebok'],
  images: [
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1605733513549-de9b150bd70d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1584473457417-bd0afe798ae1?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1734519057330-5f36e97cfa7e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1741783895531-ccc860eb946a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1662138679794-110b0cba27b9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800',
  ],
  description: "This high-stiletto platform bootie comes in genuine leather with a sculpted heel, almond toe, and a clean mid-shaft silhouette that means business. A side zip keeps things seamless, and a hidden platform takes the edge off the height so you get the lift without the second-guessing.",
  details: [
    'Genuine leather upper',
    'Man-made lining',
    'Man-made sole',
    'Heel height: 4.25"',
    'Platform height: 0.5"',
  ],
};

const COLORS = [
  { name: 'White', hex: '#F5F1EA' },
  { name: 'Grey', hex: '#B8B8B8' },
  { name: 'Black', hex: '#1A1A1A' },
];

const SIZES = [40.5, 41, 42, 43, 43.5, 44, 44.5, 45, 46];

const THUMB_LIMIT = 4;

const reviewSummary = {
  average: 4.8,
  total: 197,
  breakdown: [
    { stars: 5, count: 188 },
    { stars: 4, count: 9 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
};

const reviews = [
  {
    id: 1,
    name: 'Joanna D.',
    verified: true,
    date: '09/22/2026',
    rating: 4,
    title: 'Love this boot!',
    body: "Purchased in both brown & black. I love these, my only complaint is the sizing is inconsistent lately. I ordered similar but in knee-high type boots in my regular 5.5 but had to send back and get these in a 6. Other than the inconvenience, I hope they keep these available year after year — they're a staple.",
    helpful: 0,
    notHelpful: 0,
  },
  {
    id: 2,
    name: 'Jennifer F.',
    verified: true,
    date: '09/17/2026',
    rating: 5,
    title: 'Perfect Bootie',
    body: "I love these booties!! I've purchased several pairs over the years — black, neutral suede, and now dark brown suede. Comfortable for all-day wear and go with almost everything. Highly recommend. True to size.",
    helpful: 3,
    notHelpful: 0,
  },
];

const relatedItems = [
  {
    id: 1,
    name: 'Rasco Ruched Loafers',
    category: 'Loafers',
    image: 'https://images.unsplash.com/photo-1605733513549-de9b150bd70d?auto=format&fit=crop&q=80&w=800',
    price: '99.00',
    rating: 4.3,
    reviews: 1,
    badge: 'New',
  },
  {
    id: 2,
    name: 'Carlien Mary Jane Pumps',
    category: 'Pumps',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    price: '53.99',
    originalPrice: '99.00',
    rating: 5,
    reviews: 22,
    badge: 'Exclusive',
  },
  {
    id: 3,
    name: "Grezza d'Orsay Pumps",
    category: 'Pumps',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800',
    price: '76.30',
    originalPrice: '109.00',
    rating: 4.5,
    reviews: 14,
    badge: 'New',
  },
  {
    id: 4,
    name: 'Barile Leather Knee-High Boots',
    category: 'Boots',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800',
    price: '129.00',
    rating: 4.9,
    reviews: 27,
    badge: null,
  },
];

const Product = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [selectedSize, setSelectedSize] = useState(41);
  const [wishlisted, setWishlisted] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [relatedWishlist, setRelatedWishlist] = useState([]);

  const visibleThumbs = product.images.slice(0, THUMB_LIMIT);
  const remainingCount = product.images.length - THUMB_LIMIT;
  const maxBreakdownCount = Math.max(...reviewSummary.breakdown.map((b) => b.count), 1);

  const toggleRelatedWishlist = (id) => {
    setRelatedWishlist((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <section className="pdp-section">
      <div className="pdp-container">

        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
          {product.breadcrumb.map((crumb, i) => (
            <span key={crumb} className="pdp-breadcrumb-item">
              {crumb}
              {i < product.breadcrumb.length - 1 && (
                <ChevronRight size={12} className="pdp-breadcrumb-sep" />
              )}
            </span>
          ))}
        </nav>

        <div className="pdp-layout">

          {/* GALLERY */}
          <div className="pdp-gallery">
            <div className="pdp-main-image-wrap">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="pdp-main-image"
              />
            </div>

            <div className="pdp-thumbs">
              {visibleThumbs.map((img, i) => (
                <button
                  key={img}
                  className={`pdp-thumb ${activeImage === i ? 'pdp-thumb--active' : ''}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" className="pdp-thumb-image" />
                </button>
              ))}

              {remainingCount > 0 && (
                <button
                  className="pdp-thumb pdp-thumb-more"
                  onClick={() => setActiveImage(THUMB_LIMIT)}
                >
                  +{remainingCount} more
                </button>
              )}
            </div>
          </div>

          {/* DETAILS */}
          <div className="pdp-details">

            {/* Brand row */}
            <div className="pdp-brand-row">
              <div className="pdp-brand">
                <span className="pdp-brand-dot" />
                <span className="pdp-brand-name">{product.brand}</span>
              </div>
              <span className="pdp-sku">{product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="pdp-title">{product.name}</h1>

            {/* Rating */}
            <div className="pdp-rating">
              <div className="pdp-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`pdp-star ${i < product.rating ? 'pdp-star--filled' : ''}`}
                  />
                ))}
              </div>
              <span className="pdp-reviews">{product.reviews} reviews</span>
            </div>

            {/* Price */}
            <p className="pdp-price">Rs. {product.price}</p>

            {/* Color — styled after the Catalogue filter drawer's color selector */}
            <div className="pdp-option-block">
              <span className="pdp-option-label">
                Color <span className="pdp-option-value">{selectedColor}</span>
              </span>

              <div className="pdp-color-grid">
                {COLORS.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`pdp-color-btn ${isSelected ? 'pdp-color-btn--selected' : ''}`}
                    >
                      <span
                        className="pdp-color-swatch"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && (
                          <Check className={`pdp-color-check ${color.name === 'White' ? 'pdp-color-check--dark' : ''}`} />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size — styled after the Catalogue filter drawer's size selector */}
            <div className="pdp-option-block">
              <span className="pdp-option-label">
                Size 
                {/* <span className="pdp-option-value">EU Men</span> */}
              </span>

              <div className="pdp-size-grid">
                {SIZES.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`pdp-size-btn ${isSelected ? 'pdp-size-btn--selected' : ''}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              <button className="pdp-size-guide">Size guide</button>
            </div>

            {/* Add to cart row */}
            <div className="pdp-cart-row">
              <button className="pdp-add-to-cart">
                <ShoppingBag size={16} />
                <span>Add to cart</span>
              </button>
              <button
                className={`pdp-wishlist-btn ${wishlisted ? 'pdp-wishlist-btn--active' : ''}`}
                onClick={() => setWishlisted((prev) => !prev)}
                aria-label="Add to wishlist"
              >
                <Heart size={18} className={wishlisted ? 'pdp-wishlist-icon--active' : ''} />
              </button>
            </div>

            {/* Delivery note */}
            <div className="pdp-delivery">
              <Truck size={16} className="pdp-delivery-icon" />
              <span>Free delivery on orders over Rs. 5000</span>
            </div>

            {/* Description accordion */}
            <div className="pdp-accordion">
              <button
                className="pdp-accordion-trigger"
                onClick={() => setDescriptionOpen((prev) => !prev)}
              >
                <span>Description</span>
                <ChevronDown
                  size={16}
                  className={`pdp-accordion-chevron ${descriptionOpen ? 'pdp-accordion-chevron--open' : ''}`}
                />
              </button>

              {descriptionOpen && (
                <p className="pdp-accordion-body">{product.description}</p>
              )}
            </div>

            {/* Details accordion */}
            <div className="pdp-accordion">
              <button
                className="pdp-accordion-trigger"
                onClick={() => setDetailsOpen((prev) => !prev)}
              >
                <span>Details</span>
                <ChevronDown
                  size={16}
                  className={`pdp-accordion-chevron ${detailsOpen ? 'pdp-accordion-chevron--open' : ''}`}
                />
              </button>

              {detailsOpen && (
                <ul className="pdp-accordion-list">
                  {product.details.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        </div>

        {/* REVIEWS */}
        <div className="pdp-review">
          <h2 className="pdp-section-title">Reviews</h2>

          <div className="pdp-reviews-summary">
            <div className="pdp-reviews-average">
              <span className="pdp-reviews-average-number">{reviewSummary.average.toFixed(1)}</span>
              <div className="pdp-stars pdp-stars--lg">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`pdp-star ${i < Math.round(reviewSummary.average) ? 'pdp-star--filled' : ''}`}
                  />
                ))}
              </div>
              <span className="pdp-reviews-total">Based on {reviewSummary.total} Reviews</span>
            </div>

            <div className="pdp-reviews-breakdown">
              {reviewSummary.breakdown.map((row) => (
                <div key={row.stars} className="pdp-breakdown-row">
                  <div className="pdp-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`pdp-star ${i < row.stars ? 'pdp-star--filled' : ''}`}
                      />
                    ))}
                  </div>
                  <div className="pdp-breakdown-bar">
                    <div
                      className="pdp-breakdown-bar-fill"
                      style={{ width: `${(row.count / maxBreakdownCount) * 100}%` }}
                    />
                  </div>
                  <span className="pdp-breakdown-count">({row.count})</span>
                </div>
              ))}
            </div>

            <button className="pdp-write-review-btn">Write a Review</button>
          </div>

          <div className="pdp-review-list">
            {reviews.map((review) => (
              <div key={review.id} className="pdp-review-card">
                <div className="pdp-review-header">
                  <div className="pdp-review-author">
                    <span className="pdp-review-name">{review.name}</span>
                    {review.verified && (
                      <span className="pdp-review-verified">
                        <BadgeCheck size={13} />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="pdp-review-date">{review.date}</span>
                </div>

                <div className="pdp-review-rating">
                  <div className="pdp-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={`pdp-star ${i < review.rating ? 'pdp-star--filled' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="pdp-review-title">{review.title}</span>
                </div>

                <p className="pdp-review-body">{review.body}</p>

                <div className="pdp-review-footer">
                  <span>Was this helpful?</span>
                  <button className="pdp-review-vote">
                    <ThumbsUp size={13} /> {review.helpful}
                  </button>
                  <button className="pdp-review-vote">
                    <ThumbsDown size={13} /> {review.notHelpful}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RELATED ITEMS */}
        <div className="pdp-related">
          <div className="pdp-related-header">
            <h2 className="pdp-section-title">Related Items</h2>
          </div>

          <div className="pdp-related-grid">
            {relatedItems.map((item) => {
              const isWishlisted = relatedWishlist.includes(item.id);

              return (
                <div key={item.id} className="pdp-related-card">
                  <div className="pdp-related-image-wrap">
                    <img src={item.image} alt={item.name} className="pdp-related-image" />

                    {item.badge && <span className="pdp-related-badge">{item.badge}</span>}

                    <button
                      className="pdp-related-wishlist"
                      onClick={() => toggleRelatedWishlist(item.id)}
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        size={16}
                        className={`pdp-related-wishlist-icon ${isWishlisted ? 'pdp-related-wishlist-icon--active' : ''}`}
                      />
                    </button>

                    <div className="pdp-related-overlay">
                      <button className="pdp-related-quickview-btn">
                        <span>Quick View</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="pdp-related-info">
                    <span className="pdp-related-category">{item.category}</span>
                    <h3 className="pdp-related-name">{item.name}</h3>

                    <div className="pdp-related-rating">
                      <div className="pdp-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`pdp-star ${i < Math.floor(item.rating) ? 'pdp-star--filled' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="pdp-related-reviews">({item.reviews})</span>
                    </div>

                    <div className="pdp-related-price-row">
                      <span className="pdp-related-price">${item.price}</span>
                      {item.originalPrice && (
                        <span className="pdp-related-price-original">${item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Product;