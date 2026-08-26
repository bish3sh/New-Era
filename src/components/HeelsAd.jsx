import React from 'react';
import './HeelsAd.css';

const HeelsAd = () => {
  return (
    <section className="heels-ad">
      <div className="heels-ad-image">
        <div className="heels-ad-overlay">
          <div className="heels-ad-content">
            <h2>Elegant Heels</h2>
            <p className="heels-ad-subtitle">Elevate your style with our premium collection</p>
            <button className="heels-ad-btn">Shop Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeelsAd;