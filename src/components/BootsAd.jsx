import React from 'react';
import './BootsAd.css';
import { useNavigate } from 'react-router-dom';

const BootsAd = () => {
  const navigate = useNavigate();

  return (
    <section className="boots-ad">
      <div className="boots-ad-image">
        <div className="boots-ad-overlay">
          <div className="boots-ad-content">
            <h2>Premium Boots</h2>
            <p className="boots-ad-subtitle">Step into comfort and style</p>
            <button className="boots-ad-btn" onClick={() => navigate('/new')}>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BootsAd;