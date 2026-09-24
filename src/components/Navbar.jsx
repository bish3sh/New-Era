import React, { useState, useRef, useEffect } from 'react'
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

const navLinks = ['Home', 'New', 'Category', 'Bags', 'Sale',]

const categories = [
  'Heels', 'Sport', 'Dailywear', 'Boots',
]

const collections = ['Heels', 'Boots']

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [dropdownOffset, setDropdownOffset] = useState(14)
  // The navbar's own height — unlike its on-screen position, this doesn't
  // change when the slide `transform` animates, so it's safe to measure
  // once and combine with state (below) instead of racing the animation.
  const [navHeight, setNavHeight] = useState(90)
  const [announcementOpen, setAnnouncementOpen] = useState(true)
  // Seeded close to the real rendered height so there's no visible jump
  // before the measurement effect below runs and corrects it.
  const [announcementHeight, setAnnouncementHeight] = useState(36)
  // Tracks scroll direction: hidden once the user scrolls down at all,
  // shown again only once they're back at the very top of the page.
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

  // Keep the announcement bar, navbar, and category dropdown measurements
  // current. Note: this deliberately measures each element's own height
  // (offsetHeight), not its live on-screen position (getBoundingClientRect
  // bottom) — offsetHeight is unaffected by the slide `transform`, so these
  // values stay correct throughout the slide animation with no race
  // condition. The search panel's actual on-screen position is then derived
  // from these stable numbers plus `scrolledDown` at render time, below.
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
          // Category dropdown gap: both the navbar and this trigger sit
          // inside the same transformed element, so their relative offset
          // is invariant to the slide — getBoundingClientRect is fine here.
          const navRect = navRef.current.getBoundingClientRect()
          const itemRect = categoryRef.current.getBoundingClientRect()
          setDropdownOffset(Math.round(navRect.bottom - itemRect.bottom))
        }
      }
    }

    updatePositions()

    // Re-measure once web fonts finish swapping in — if the navbar's text
    // reflows after custom fonts load, the height captured on first paint
    // goes stale and the search panel top no longer lines up.
    if (document.fonts?.ready) {
      document.fonts.ready.then(updatePositions)
    }

    // Catches any resize (including height-only changes) plus late image loads.
    window.addEventListener('resize', updatePositions)
    window.addEventListener('load', updatePositions)

    // Catches layout shifts window resize won't (font swap without a resize
    // event, announcement text wrapping to a second line on narrow screens,
    // etc.) by watching both elements directly.
    const resizeObserver = new ResizeObserver(updatePositions)
    if (navRef.current) resizeObserver.observe(navRef.current)
    if (announcementRef.current) resizeObserver.observe(announcementRef.current)

    return () => {
      window.removeEventListener('resize', updatePositions)
      window.removeEventListener('load', updatePositions)
      resizeObserver.disconnect()
    }
  }, [announcementOpen])

  // Scroll-direction detection: hide the announcement bar the moment the
  // user scrolls down at all, and only bring it back once they've
  // scrolled all the way back to the top — not on every scroll-up.
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
            Free shipping on all orders above ₹1499
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