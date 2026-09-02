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
      image:  Shoe1 ,
      year: 2010,
      rating: 8.8,
    },
    {
      id: 2,
      title: 'The Matrix',
      image: 'https://images.unsplash.com/photo-1535659513767-f1a7b068ebc1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      year: 1999,
      rating: 8.7,
    },
    {
      id: 3,
      title: 'Interstellar',
      image: 'https://images.unsplash.com/photo-1775297832774-9eb647970c68?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      year: 2014,
      rating: 8.6,
    },
    {
      id: 4,
      title: 'The Dark Knight',
      image: 'https://images.unsplash.com/photo-1716347685956-bdcaa3ad6320?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      year: 2008,
      rating: 9.0,
    },
    {
      id: 5,
      title: 'Avatar',
      image: 'https://images.unsplash.com/photo-1628182959315-d4d15d5cc845?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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

      </section>
    </div>
    // </div>
  )
}

export default Hero