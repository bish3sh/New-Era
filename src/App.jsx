import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import HeelsAd from './components/Heelsad';
import BootsAd from './components/BootsAd';


const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <HeelsAd />
      <BootsAd />
      <Footer />
    </div>
  )
}

export default App
