import React from 'react';
import './Categorygrid.css';

const categories = [
  {
    name: 'Heels',
    image:
      'https://images.unsplash.com/photo-1590099033615-be195f8d575c?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Sports',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  },
  {
    name: 'Dailywear',
    image:
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Boots',
    image:
      'https://images.unsplash.com/photo-1763661300203-aa3e2702f510?q=80&w=702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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