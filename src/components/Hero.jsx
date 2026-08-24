import React from 'react'
import Carousel from './Carousel';
import Shoe1 from '../assets/shoe1.jpg';
import CategoryGrid from './Categorygrid';
import './Hero.css'

const Hero = () => {

     // Carousel slides data
  const carouselSlides = [
    {
      id: 1,
      title: 'Inception',
      image: {Shoe1},
      year: 2010,
      rating: 8.8,
    },
    {
      id: 2,
      title: 'The Matrix',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=500&fit=crop',
      year: 1999,
      rating: 8.7,
    },
    {
      id: 3,
      title: 'Interstellar',
      image: 'https://images.unsplash.com/photo-1474136553698-0717c5f0bda3?w=1200&h=500&fit=crop',
      year: 2014,
      rating: 8.6,
    },
    {
      id: 4,
      title: 'The Dark Knight',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=500&fit=crop',
      year: 2008,
      rating: 9.0,
    },
    {
      id: 5,
      title: 'Avatar',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c6ed2963c?w=1200&h=500&fit=crop',
      year: 2009,
      rating: 8.0,
    },
  ];
 

  return (
    // <div>
      <div className="content-grid">

          <section className="carousel-large">
            <Carousel 
              slides={carouselSlides}
              autoPlay={true}
              autoPlayInterval={5000}
            />

          <CategoryGrid onSelectCategory={(name) => console.log('Selected category:', name)} />

          <div className="hero-tape">
            <div className="hero-tape-content">
              <span>NEW ERA</span>
              <span>NEW ERA</span>
              <span>NEW ERA</span>
              <span>NEW ERA</span>
              <span>NEW ERA</span>
               <span>NEW ERA</span>
              <span>NEW ERA</span>
              <span>NEW ERA</span>
              <span>NEW ERA</span>
              <span>NEW ERA</span>
               <span>NEW ERA</span>
              <span>NEW ERA</span>
              <span>NEW ERA</span>
              <span>NEW ERA</span>
              <span>NEW ERA</span>
            </div>
          </div>

          </section>
        </div>
    // </div>
  )
}

export default Hero