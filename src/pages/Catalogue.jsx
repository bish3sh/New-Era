import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Heart,
  Star,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import './Catalogue.css';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Quanette Platform Leather Booties",
    category: "Boots",
    price: 104.30,
    originalPrice: 149.00,
    discount: "30% OFF",
    badge: "Exclusive",
    rating: 4.8,
    reviews: 195,
    sizes: [36, 37, 38, 39],
    color: "Tan",
    heelHeight: "High 3\"+",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
    isNew: false
  },
  {
    id: 2,
    name: "Noir Heeled Thong Sandals",
    category: "Heels",
    price: 79.99,
    originalPrice: 99.00,
    discount: "20% OFF",
    badge: "Exclusive",
    rating: 4.6,
    reviews: 7,
    sizes: [35, 36, 37, 38, 39, 40],
    color: "Black",
    heelHeight: "Mid 2-3\"",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
    isNew: false
  },
  {
    id: 3,
    name: "Mandey Dress Sandals",
    category: "Heels",
    price: 99.00,
    originalPrice: null,
    discount: null,
    badge: "Exclusive",
    rating: 5.0,
    reviews: 6,
    sizes: [37, 38, 39, 40, 41],
    color: "Silver",
    heelHeight: "High 3\"+",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800",
    isNew: true
  },
  {
    id: 4,
    name: "Barile Leather Knee-High Boots",
    category: "Boots",
    price: 129.00,
    originalPrice: null,
    discount: null,
    badge: "New",
    rating: 4.9,
    reviews: 27,
    sizes: [36, 37, 38, 39, 40],
    color: "Black",
    heelHeight: "Low <2\"",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800",
    isNew: true
  },
  {
    id: 5,
    name: "Aura Metallic Strappy Pump",
    category: "Heels",
    price: 88.50,
    originalPrice: 110.00,
    discount: "20% OFF",
    badge: "New",
    rating: 4.7,
    reviews: 42,
    sizes: [35, 36, 37, 38],
    color: "Gold",
    heelHeight: "High 3\"+",
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800",
    isNew: true
  },
  {
    id: 6,
    name: "Velocity Pro Runner Sneakers",
    category: "Sports",
    price: 115.00,
    originalPrice: 135.00,
    discount: "15% OFF",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 310,
    sizes: [36, 37, 38, 39, 40, 41],
    color: "White",
    heelHeight: "Flat",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800",
    isNew: false
  },
  {
    id: 7,
    name: "Serene Cushioned Everyday Loafers",
    category: "Dailywear",
    price: 65.00,
    originalPrice: null,
    discount: null,
    badge: null,
    rating: 4.5,
    reviews: 88,
    sizes: [35, 36, 37, 38, 39],
    color: "Nude",
    heelHeight: "Flat",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
    isNew: false
  },
  {
    id: 8,
    name: "Monogram Structured Tote Bag",
    category: "Bags",
    price: 145.00,
    originalPrice: 180.00,
    discount: "20% OFF",
    badge: "Limited",
    rating: 4.9,
    reviews: 54,
    sizes: ["One Size"],
    color: "Tan",
    heelHeight: "N/A",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    isNew: true
  }
];

const CATEGORIES = ["Heels", "Sports", "Dailywear", "Boots", "Bags"];
const SIZES = [35, 36, 37, 38, 39, 40, 41];
const HEEL_HEIGHTS = ["Flat", "Low <2\"", "Mid 2-3\"", "High 3\"+"];
const COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "Nude", hex: "#E8C8B5" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Tan", hex: "#A52A2A" },
  { name: "Gold", hex: "#D4AF37" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Red", hex: "#DC2626" }
];

export default function Catalogue() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState([]);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedHeelHeights, setSelectedHeelHeights] = useState([]);
  const [maxPrice, setMaxPrice] = useState(200);

  // Accordion open states inside drawer
  const [openAccordion, setOpenAccordion] = useState({
    category: true,
    size: true,
    color: true,
    heelHeight: false,
    price: true
  });

  const toggleAccordion = (key) => {
    setOpenAccordion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleCategoryToggle = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (colorName) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const handleHeelToggle = (height) => {
    setSelectedHeelHeights(prev =>
      prev.includes(height) ? prev.filter(h => h !== height) : [...prev, height]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedHeelHeights([]);
    setMaxPrice(200);
  };

  const activeFilterCount = selectedCategories.length + selectedSizes.length + selectedColors.length + selectedHeelHeights.length + (maxPrice < 200 ? 1 : 0);

  // Computed Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(product => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
      if (selectedSizes.length > 0 && !product.sizes.some(s => selectedSizes.includes(s))) return false;
      if (selectedColors.length > 0 && !selectedColors.includes(product.color)) return false;
      if (selectedHeelHeights.length > 0 && !selectedHeelHeights.includes(product.heelHeight)) return false;
      if (product.price > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id; // Default Featured
    });
  }, [selectedCategories, selectedSizes, selectedColors, selectedHeelHeights, maxPrice, sortBy]);

  return (
    <div className="catalogue">

      {/* Toolbar */}
      <div className="catalogue-toolbar">
        <div className="catalogue-container catalogue-toolbar-inner">

          {/* Left: Filter Toggle Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="catalogue-filter-btn"
          >
            <SlidersHorizontal className="catalogue-filter-icon" />
            <span>FILTER</span>
            <span className="catalogue-filter-count">
              ({filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'products'})
            </span>
            {activeFilterCount > 0 && (
              <span className="catalogue-filter-badge">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Right: Sort Dropdown */}
          <div className="catalogue-sort">
            <span className="catalogue-sort-label">Sort by</span>
            <div className="catalogue-select-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="catalogue-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="catalogue-select-chevron" />
            </div>
          </div>

        </div>
      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="catalogue-backdrop"
        />
      )}

      {/* Drawer Panel */}
      <aside className={`catalogue-drawer ${isDrawerOpen ? 'catalogue-drawer--open' : ''}`}>

        {/* Drawer Header */}
        <div className="catalogue-drawer-header">
          <div className="catalogue-drawer-header-title">
            <SlidersHorizontal className="catalogue-drawer-header-icon" />
            <h2>Refine Collection</h2>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="catalogue-drawer-close"
            aria-label="Close filters"
          >
            <X className="catalogue-drawer-close-icon" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="catalogue-drawer-body">

          {/* Category Filter */}
          <div className="catalogue-accordion">
            <button
              onClick={() => toggleAccordion('category')}
              className="catalogue-accordion-trigger"
            >
              <span>Category</span>
              <ChevronDown className={`catalogue-accordion-chevron ${openAccordion.category ? 'catalogue-accordion-chevron--open' : ''}`} />
            </button>

            {openAccordion.category && (
              <div className="catalogue-checkbox-list">
                {CATEGORIES.map(category => (
                  <label key={category} className="catalogue-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="catalogue-checkbox"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Size Filter */}
          <div className="catalogue-accordion">
            <button
              onClick={() => toggleAccordion('size')}
              className="catalogue-accordion-trigger"
            >
              <span>Shoe Size (EU)</span>
              <ChevronDown className={`catalogue-accordion-chevron ${openAccordion.size ? 'catalogue-accordion-chevron--open' : ''}`} />
            </button>

            {openAccordion.size && (
              <div className="catalogue-size-grid">
                {SIZES.map(size => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`catalogue-size-btn ${isSelected ? 'catalogue-size-btn--selected' : ''}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Color Filter */}
          <div className="catalogue-accordion">
            <button
              onClick={() => toggleAccordion('color')}
              className="catalogue-accordion-trigger"
            >
              <span>Color</span>
              <ChevronDown className={`catalogue-accordion-chevron ${openAccordion.color ? 'catalogue-accordion-chevron--open' : ''}`} />
            </button>

            {openAccordion.color && (
              <div className="catalogue-color-grid">
                {COLORS.map(color => {
                  const isSelected = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => handleColorToggle(color.name)}
                      className={`catalogue-color-btn ${isSelected ? 'catalogue-color-btn--selected' : ''}`}
                    >
                      <span
                        className="catalogue-color-swatch"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && (
                          <Check className={`catalogue-color-check ${color.name === 'White' ? 'catalogue-color-check--dark' : ''}`} />
                        )}
                      </span>
                      <span className="catalogue-color-name">{color.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Heel Height Filter */}
          <div className="catalogue-accordion">
            <button
              onClick={() => toggleAccordion('heelHeight')}
              className="catalogue-accordion-trigger"
            >
              <span>Heel Height</span>
              <ChevronDown className={`catalogue-accordion-chevron ${openAccordion.heelHeight ? 'catalogue-accordion-chevron--open' : ''}`} />
            </button>

            {openAccordion.heelHeight && (
              <div className="catalogue-checkbox-list">
                {HEEL_HEIGHTS.map(height => (
                  <label key={height} className="catalogue-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedHeelHeights.includes(height)}
                      onChange={() => handleHeelToggle(height)}
                      className="catalogue-checkbox"
                    />
                    <span>{height}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="catalogue-accordion">
            <button
              onClick={() => toggleAccordion('price')}
              className="catalogue-accordion-trigger"
            >
              <span>Max Price: ${maxPrice}</span>
              <ChevronDown className={`catalogue-accordion-chevron ${openAccordion.price ? 'catalogue-accordion-chevron--open' : ''}`} />
            </button>

            {openAccordion.price && (
              <div className="catalogue-range-wrap">
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="catalogue-range"
                />
                <div className="catalogue-range-labels">
                  <span>$50</span>
                  <span>${maxPrice}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Drawer Sticky Footer Actions */}
        <div className="catalogue-drawer-footer">
          <button
            onClick={clearAllFilters}
            className="catalogue-reset-btn"
          >
            <RotateCcw className="catalogue-reset-icon" />
            <span>Reset</span>
          </button>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="catalogue-apply-btn"
          >
            Apply ({filteredProducts.length})
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="catalogue-container catalogue-main">

        {/* Active Filter Chips Bar */}
        {activeFilterCount > 0 && (
          <div className="catalogue-chips">
            <span className="catalogue-chips-label">Active Filters:</span>

            {selectedCategories.map(cat => (
              <span key={cat} className="catalogue-chip">
                {cat}
                <X className="catalogue-chip-close" onClick={() => handleCategoryToggle(cat)} />
              </span>
            ))}

            {selectedSizes.map(size => (
              <span key={size} className="catalogue-chip">
                Size {size}
                <X className="catalogue-chip-close" onClick={() => handleSizeToggle(size)} />
              </span>
            ))}

            {selectedColors.map(color => (
              <span key={color} className="catalogue-chip">
                {color}
                <X className="catalogue-chip-close" onClick={() => handleColorToggle(color)} />
              </span>
            ))}

            <button
              onClick={clearAllFilters}
              className="catalogue-chips-clear"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product Grid / Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="catalogue-empty">
            <Sparkles className="catalogue-empty-icon" />
            <h3 className="catalogue-empty-title">No matching products found</h3>
            <p className="catalogue-empty-text">Try adjusting or clearing your active filters to view items.</p>
            <button
              onClick={clearAllFilters}
              className="catalogue-empty-btn"
            >
              <RotateCcw className="catalogue-empty-btn-icon" />
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="catalogue-grid">
            {filteredProducts.map(product => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div key={product.id} className="catalogue-card">

                  {/* Image & Overlay Container */}
                  <div className="catalogue-card-image-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="catalogue-card-image"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="catalogue-badge">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="catalogue-card-wishlist"
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`catalogue-card-wishlist-icon ${isWishlisted ? 'catalogue-card-wishlist-icon--active' : ''}`} />
                    </button>

                    {/* Hover Quick View Overlay */}
                    <div className="catalogue-card-overlay">
                      <button className="catalogue-quickview-btn">
                        <span>Quick View</span>
                        <ArrowRight className="catalogue-quickview-icon" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="catalogue-card-body">
                    {/* Category Label */}
                    <span className="catalogue-card-category">
                      {product.category}
                    </span>

                    {/* Title */}
                    <h3 className="catalogue-card-title">
                      {product.name}
                    </h3>

                    {/* Ratings */}
                    <div className="catalogue-card-rating">
                      <div className="catalogue-card-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`catalogue-card-star ${i < Math.floor(product.rating) ? 'catalogue-card-star--filled' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="catalogue-card-reviews">({product.reviews})</span>
                    </div>

                    {/* Pricing Display */}
                    <div className="catalogue-card-price-row">
                      <span className="catalogue-card-price">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="catalogue-card-price-original">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

    </div>
  );
}