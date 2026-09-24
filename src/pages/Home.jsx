import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HeelsAd from '../components/Heelsad'
import BootsAd from '../components/BootsAd'
import TopSelling from '../components/TopSelling'
import BagsSection from '../components/BagsSection'
import AboutUs from '../components/AboutUs'

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <HeelsAd />
      <TopSelling />
      <BootsAd />
      <BagsSection />
      <AboutUs />
    </>
  )
}

export default Home