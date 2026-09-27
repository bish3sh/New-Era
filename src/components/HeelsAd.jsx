import React from 'react';
import './HeelsAd.css';
import { useNavigate } from 'react-router-dom';

const HeelsAd = () => {
  const navigate = useNavigate();

  return (
    <section className="heels-ad">
      <div className="heels-ad-image">
        <div className="heels-ad-overlay">
          <div className="heels-ad-content">
            <h2>Elegant Heels</h2>
            <p className="heels-ad-subtitle">Elevate your style with our premium collection</p>
            <button className="heels-ad-btn" onClick={() => navigate('/new')}>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeelsAd;