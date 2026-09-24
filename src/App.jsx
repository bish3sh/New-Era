import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import {Route, Routes } from 'react-router-dom'
import Catalogue from './pages/Catalogue'
import Product from './pages/Product'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<Catalogue />} />
        <Route path='/product' element={<Product />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App