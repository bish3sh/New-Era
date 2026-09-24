import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Truck, Check, ChevronRight } from 'lucide-react';
import './Product.css';

const product = {
  brand: 'Reebok',
  sku: 'HR1325ROO-.-8',
  name: 'Shoes Reebok Zig Kinetica 3',
  rating: 4,
  reviews: 42,
  price: 199.0,
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
};

const COLORS = [
  { name: 'White', hex: '#F5F1EA' },
  { name: 'Grey', hex: '#B8B8B8' },
  { name: 'Black', hex: '#1A1A1A' },
];

const SIZES = [40.5, 41, 42, 43, 43.5, 44, 44.5, 45, 46];

const THUMB_LIMIT = 4;

const Product = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [selectedSize, setSelectedSize] = useState(41);
  const [wishlisted, setWishlisted] = useState(false);

  const visibleThumbs = product.images.slice(0, THUMB_LIMIT);
  const remainingCount = product.images.length - THUMB_LIMIT;

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
            <p className="pdp-price">${product.price.toFixed(2)}</p>

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
                Size <span className="pdp-option-value">EU Men</span>
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
                <ShoppingCart size={16} />
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
              <span>Free delivery on orders over $30.0</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;