import React from 'react';
import './Categorygrid.css';

const categories = [
  {
    name: 'Heels',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  },
  {
    name: 'Sports',
    image:
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80',
  },
  {
    name: 'Dailywear',
    image:
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
  },
  {
    name: 'Boots',
    image:
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80',
  },
];

const CategoryGrid = ({ onSelectCategory }) => {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <div
          className="category-card"
          key={category.name}
          onClick={() => onSelectCategory(category.name)}
        >
          <img
            src={category.image}
            alt={category.name}
            className="category-image"
          />

          <div className="category-overlay"></div>

          <h3 className="category-title">{category.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;