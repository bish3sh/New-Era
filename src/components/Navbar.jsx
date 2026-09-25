import React, { useState, useRef, useEffect } from 'react'
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'New', path: '/new' },
  { name: 'Category', path: null }, // Category triggers dropdown, no direct link
  { name: 'Bags', path: '/category/bags' },
  { name: 'Sale', path: '/sale' },
]

const categories = [
  { name: 'Heels', path: '/category/heels' },
  { name: 'Sport', path: '/category/sport' },
  { name: 'Dailywear', path: '/category/dailywear' },
  { name: 'Boots', path: '/category/boots' },
]

const collections = ['Heels', 'Boots']

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [dropdownOffset, setDropdownOffset] = useState(14)
  const [navHeight, setNavHeight] = useState(90)
  const [announcementOpen, setAnnouncementOpen] = useState(true)
  const [announcementHeight, setAnnouncementHeight] = useState(36)
  const [scrolledDown, setScrolledDown] = useState(false)

  const categoryRef = useRef(null)
  const navRef = useRef(null)
  const announcementRef = useRef(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const updatePositions = () => {
      if (announcementRef.current) {
        setAnnouncementHeight(Math.round(announcementRef.current.offsetHeight))
      } else if (!announcementOpen) {
        setAnnouncementHeight(0)
      }

      if (navRef.current) {
        setNavHeight(Math.round(navRef.current.offsetHeight))

        if (categoryRef.current) {
          const navRect = navRef.current.getBoundingClientRect()
          const itemRect = categoryRef.current.getBoundingClientRect()
          setDropdownOffset(Math.round(navRect.bottom - itemRect.bottom))
        }
      }
    }

    updatePositions()
    if (document.fonts?.ready) {
      document.fonts.ready.then(updatePositions)
    }

    window.addEventListener('resize', updatePositions)
    window.addEventListener('load', updatePositions)

    const resizeObserver = new ResizeObserver(updatePositions)
    if (navRef.current) resizeObserver.observe(navRef.current)
    if (announcementRef.current) resizeObserver.observe(announcementRef.current)

    return () => {
      window.removeEventListener('resize', updatePositions)
      window.removeEventListener('load', updatePositions)
      resizeObserver.disconnect()
    }
  }, [announcementOpen])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 0) {
        setScrolledDown(false)
      } else if (currentScrollY > lastScrollY.current) {
        setScrolledDown(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      {/* ANNOUNCEMENT BAR */}
      {announcementOpen && (
        <div
          className="announcement-bar"
          ref={announcementRef}
          style={{ transform: scrolledDown ? 'translateY(-100%)' : 'translateY(0)' }}
        >
          <span className="announcement-text">
            Free shipping on all orders above Rs. 5000
          </span>
          {/* <X
            size={14}
            className="announcement-close"
            onClick={() => setAnnouncementOpen(false)}
          /> */}
        </div>
      )}

      {/* NAVBAR */}
      <nav
        className="navbar"
        ref={navRef}
        style={{
          top: `${announcementHeight}px`,
          transform: scrolledDown ? `translateY(-${announcementHeight}px)` : 'translateY(0)',
        }}
      >
        <Link to="/"><div className="logo">NEW ERA</div></Link>

        <ul className="nav-links">
          {navLinks.map((item) =>
            item.name === 'Category' ? (
              <li key={item.name} className="category-item" ref={categoryRef}>
                <button
                  className={`category-trigger ${categoryOpen ? 'active' : ''}`}
                  onClick={() => setCategoryOpen((prev) => !prev)}
                >
                  {item.name}
                  <ChevronDown size={14} className="category-chevron" />
                </button>

                <div
                  className={`category-dropdown ${categoryOpen ? 'open' : ''}`}
                  style={{ '--dropdown-gap': `${dropdownOffset}px` }}
                >
                  {categories.map((cat) => (
                    <Link
                      to={cat.path}
                      key={cat.name}
                      className="category-option"
                      onClick={() => setCategoryOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </li>
            ) : (
              <li key={item.name}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            )
          )}
        </ul>

        <div className="navbar-right">
          <Search size={22} className="navbar-icon" onClick={() => setSearchOpen(true)} />
          <Heart size={24} className="navbar-icon" />
          <ShoppingBag size={24} className="navbar-icon" />
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
        style={{ top: `${scrolledDown ? navHeight : announcementHeight + navHeight}px` }}
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
          {navLinks.map((item) =>
            item.name === 'Category' ? (
              <li key={item.name} className="offcanvas-category-item">
                <button
                  className={`offcanvas-category-trigger ${categoryOpen ? 'active' : ''}`}
                  onClick={() => setCategoryOpen((prev) => !prev)}
                >
                  {item.name}
                  <ChevronDown size={16} className="offcanvas-category-chevron" />
                </button>

                <div className={`offcanvas-category-list ${categoryOpen ? 'open' : ''}`}>
                  {categories.map((cat) => (
                    <Link
                      to={cat.path}
                      key={cat.name}
                      onClick={() => setIsOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </li>
            ) : (
              <li key={item.name}>
                <Link to={item.path} onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar