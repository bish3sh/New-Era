import React, { useState, useRef, useEffect } from 'react'
import { Search, Bookmark, User, Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

const navLinks = ['Home', 'New', 'Category', 'Bags', 'Sale',]

const categories = [
  'Party', 'Sport', 'Dailywear', 'Boots',
]

const collections = ['Heels', 'Boots']

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [dropdownOffset, setDropdownOffset] = useState(14)
  const [navBottom, setNavBottom] = useState(0)

  const categoryRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keep the category dropdown and search panel flush with the navbar's bottom edge
  useEffect(() => {
    const updatePositions = () => {
      if (navRef.current) {
        const navRect = navRef.current.getBoundingClientRect()
        setNavBottom(navRect.bottom)

        if (categoryRef.current) {
          const itemRect = categoryRef.current.getBoundingClientRect()
          setDropdownOffset(navRect.bottom - itemRect.bottom)
        }
      }
    }

    updatePositions()
    window.addEventListener('resize', updatePositions)
    return () => window.removeEventListener('resize', updatePositions)
  }, [])

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar" ref={navRef}>
        <div className="logo">NEW ERA</div>

        <ul className="nav-links">
          {navLinks.map((link) =>
            link === 'Category' ? (
              <li key={link} className="category-item" ref={categoryRef}>
                <button
                  className={`category-trigger ${categoryOpen ? 'active' : ''}`}
                  onClick={() => setCategoryOpen((prev) => !prev)}
                >
                  {link}
                  <ChevronDown size={14} className="category-chevron" />
                </button>

                <div
                  className={`category-dropdown ${categoryOpen ? 'open' : ''}`}
                  style={{ '--dropdown-gap': `${dropdownOffset}px` }}
                >
                  {categories.map((category) => (
                    <a
                      href="#"
                      key={category}
                      className="category-option"
                      onClick={() => setCategoryOpen(false)}
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </li>
            ) : (
              <li key={link}><a href="#">{link}</a></li>
            )
          )}
        </ul>

        <div className="navbar-right">
          <Search size={22} className="navbar-icon" onClick={() => setSearchOpen(true)} />
          <Bookmark size={24} className="navbar-icon" />
          <User size={24} className="navbar-icon" />
          <Menu size={24} className="navbar-icon menu-toggle" onClick={() => setIsOpen(true)} />
        </div>
      </nav>

      {/* SEARCH DROPDOWN */}
      <div
        className={`search-overlay ${searchOpen ? 'active' : ''}`}
        onClick={() => setSearchOpen(false)}
      />
      <div
        className={`search-panel ${searchOpen ? 'open' : ''}`}
        style={{ top: `${navBottom}px` }}
      >
        <div className="search-panel-inner">
          <Search size={20} className="search-panel-icon" />
          <input
            type="text"
            placeholder="WHAT ARE YOU LOOKING FOR?"
            className="search-panel-input"
          />
          <X size={22} className="search-panel-close" onClick={() => setSearchOpen(false)} />
        </div>

        <div className="search-panel-collections">
          <p className="collections-label">POPULAR COLLECTIONS</p>
          <div className="collections-list">
            {collections.map((item) => (
              <a href="#" key={item}>{item.toUpperCase()}</a>
            ))}
          </div>
        </div>
      </div>

      {/* OFFCANVAS */}
      <div
        className={`offcanvas-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      />
      <div className={`offcanvas ${isOpen ? 'open' : ''}`}>
        <div className="offcanvas-header">
          <X size={24} className="close-icon" onClick={() => setIsOpen(false)} />
        </div>

        <ul className="offcanvas-links">
          {navLinks.map((link) =>
            link === 'Category' ? (
              <li key={link} className="offcanvas-category-item">
                <button
                  className={`offcanvas-category-trigger ${categoryOpen ? 'active' : ''}`}
                  onClick={() => setCategoryOpen((prev) => !prev)}
                >
                  {link}
                  <ChevronDown size={16} className="offcanvas-category-chevron" />
                </button>

                <div className={`offcanvas-category-list ${categoryOpen ? 'open' : ''}`}>
                  {categories.map((category) => (
                    <a
                      href="#"
                      key={category}
                      onClick={() => setIsOpen(false)}
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </li>
            ) : (
              <li key={link}>
                <a href="#" onClick={() => setIsOpen(false)}>{link}</a>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar