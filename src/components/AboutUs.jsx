import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-us-container">
        {/* Left Side - Image */}
        <div className="about-us-image-section">
          <img
            src="https://images.unsplash.com/photo-1567958528086-8d8324137918?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About New Era"
            className="about-us-image"
          />
        </div>

        {/* Right Side - Content */}
        <div className="about-us-content-section">
          <div className="about-us-content">
            <h2 className="about-us-title">About New Era</h2>
            <p className="about-us-description">
              We are New Era from Kathmandu, Nepal. With the vision of crafting design and comfort in footwear, we set on this venture to stir domestic production and manufacturing. Every step tells a story, and we believe in creating shoes that empower you to walk with confidence and style.
            </p>
            <p className="about-us-description">
              Our commitment to quality, sustainability, and innovation drives us to deliver premium footwear that celebrates both tradition and modernity. From casual everyday wear to statement pieces, we craft shoes that fit your lifestyle perfectly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;