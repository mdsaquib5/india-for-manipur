'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { navigation } from '@/constants/websiteData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}
      role="banner"
    >
      <div className="navbar__inner">
        {/* Logo */}
        <a
          href="#story"
          className="navbar__logo"
          onClick={(e) => handleNavClick(e, '#story')}
          aria-label="India For Manipur - Go to top"
        >
          India For <span className="red-manipur">Manipur</span>
        </a>

        {/* Desktop Links */}
        <nav aria-label="Main navigation">
          <ul className="navbar__links" role="list">
            {navigation.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navbar__link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="https://www.instagram.com/india4manipur?igsh=bDUxdnp5eGcwcTU3"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__cta"
        >
          Instagram
        </a>

        {/* Mobile Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`navbar__mobile ${menuOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
      >
        {navigation.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar__mobile-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://www.instagram.com/india4manipur?igsh=bDUxdnp5eGcwcTU3"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ textAlign: 'center' }}
        >
          Instagram
        </a>
      </nav>
    </header>
  );
}
