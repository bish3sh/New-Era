import React from 'react';
// import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Content */}
      <div className="footer-content">
        
        {/* About Section */}
        <div className="footer-column">
          <h3 className="footer-title">NEW ERA</h3>
          <div className="about-section">
            {/* <p className="about-text">
              We are New Era from Kathmandu, Nepal. With the vision of crafting design and comfort in footwear we set on this venture to stir domestic production and manufacturing.
            </p> */}
            
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <div>
                  <p className="contact-label">Mahalpal, Lalitpur, Nepal</p>
                  {/* <p className="contact-label">Lalitpur, Nepal</p> */}
                </div>
              </div>
              
              <div className="contact-item">
                <Phone size={18} className="contact-icon" />
                <p className="contact-label">Phone: 01-5444693</p>
              </div>
              
              <div className="contact-item">
                <Mail size={18} className="contact-icon" />
                <p className="contact-label">Email: info@newera.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Help & Policies */}
        <div className="footer-column">
          <h3 className="footer-title">HELP & POLICIES</h3>
          <ul className="footer-links">
            <li><a href="#/">Customer Help Center</a></li>
            <li><a href="#/">Refund Policy</a></li>
            <li><a href="#/">Shipping Policy</a></li>
            {/* <li><a href="#/">Subscription Policy</a></li> */}
            <li><a href="#/">Size Guide</a></li>
            {/* <li><a href="#/">Klarna</a></li> */}
            {/* <li><a href="#/">Help Code</a></li> */}
            {/* <li><a href="#/">Enable Accessibility</a></li> */}
          </ul>
        </div>

        {/* My Account & Orders */}
        <div className="footer-column">
          <h3 className="footer-title">MY ACCOUNT & ORDERS</h3>
          <ul className="footer-links">
            <li><a href="#/">Sign Up / Log In</a></li>
            <li><a href="#/">Return An Item</a></li>
            <li><a href="#/">Track Your Order</a></li>
            {/* <li><a href="#/">Loyalty Hub</a></li> */}
          </ul>
        </div>

        {/* Shop */}
        <div className="footer-column">
          <h3 className="footer-title">SHOP</h3>
          <ul className="footer-links">
            <li><a href="#/">All Shoes</a></li>
            {/* <li><a href="#/">E-Gift Cards</a></li> */}
            <li><a href="#/">New Arrivals</a></li>
            <li><a href="#/">Best Sellers</a></li>
            {/* <li><a href="#/">Trending</a></li> */}
            <li><a href="#/">Sale</a></li>
            <li><a href="#/">All Handbags</a></li>
            {/* <li><a href="#/">Sitemap</a></li> */}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p className="copyright">© 2024, New Era</p>
        </div>

        <div className="footer-bottom-center">
          <a href="#/">Accessibility Statement</a>
          <a href="#/">Terms of Service</a>
          <a href="#/">Privacy Policy</a>
        </div>

        <div className="footer-bottom-right">
          <a href="#/" className="social-icon" aria-label="Facebook">
            <FaFacebookF size={20} />
          </a>
          <a href="#/" className="social-icon" aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
          <a href="#/" className="social-icon" aria-label="Twitter">
            <FaTiktok size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;