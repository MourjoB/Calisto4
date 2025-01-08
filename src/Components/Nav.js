"use client";
import './nav.css';
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronUp } from 'lucide-react';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);

      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 shadow-lg ${
          isScrolled ? 'bg-white/90 backdrop-blur-md py-0.1 border-b border-gray-200' : 'bg-transparent py-4'
        } ${isMenuOpen ? 'bg-white' : ''}`}
      >
        <div 
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/images/Calisto.png" 
                alt="Calisto Logo" 
                className="logo-image cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={() => scrollToSection('hero')}
              />
            </div>

            <div className="hidden md:flex items-center gap-8">
              <div className="nav-links flex gap-6">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="nav-link font-display text-base text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
                >
                  Products
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button 
                  onClick={() => scrollToSection('calculator')}
                  className="nav-link font-display text-base text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
                >
                  Quote Calculator
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="nav-link font-display text-base text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
              <button 
                onClick={() => scrollToSection('contact')}
                className="contact-btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Phone size={16} className="icon" />
                <span>Contact Us</span>
              </button>
            </div>

            <button 
              className="menu-btn md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div 
            className={`mobile-menu md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'open' : ''
            }`}
          >
            <button onClick={() => scrollToSection('products')} className="mobile-nav-link">Products</button>
            <button onClick={() => scrollToSection('calculator')} className="mobile-nav-link">Quote Calculator</button>
            <button onClick={() => scrollToSection('about')} className="mobile-nav-link">About</button>
            <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">Contact Us</button>
          </div>
        </div>
      </nav>

      <button 
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? 'show' : ''}`}
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
};

export default Nav;