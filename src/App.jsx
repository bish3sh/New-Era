import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import HeelsAd from './components/Heelsad';
import BootsAd from './components/BootsAd';
import TopSelling from './components/TopSelling';
import BagsSection from './components/BagsSection';
import AboutUs from './components/AboutUs';


const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <HeelsAd />
      <TopSelling />
      <BootsAd />
      <BagsSection />
      <AboutUs />
      <Footer />
    </div>
  )
}

export default App
