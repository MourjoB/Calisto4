"use client";

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
      <nav className={`fixed w-full z-50 transition-all duration-500 shadow-lg h-20 flex items-center justify-between px-4 box-border font-poppins
        ${isScrolled ? 'bg-white/90 backdrop-blur-md py-0.5 border-b border-gray-200' : 'bg-transparent py-4'}
        ${isMenuOpen ? 'bg-white' : ''}`}
      >
        <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
        
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center pb-5">
              <img 
                src="/images/Calisto.png" 
                alt="Calisto Logo" 
                className="h-[70px] w-auto cursor-pointer transition-all duration-300 hover:scale-110 -mb-8 md:h-[40px]"
                onClick={() => scrollToSection('hero')}
              />
            </div>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-8">
                {['products', 'calculator', 'about'].map((section) => (
                  <button 
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="relative text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 font-roboto hover:-translate-y-0.5 group"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-base hover:scale-105 transition-all duration-300"
              >
                <Phone size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                <span>Contact Us</span>
              </button>
            </div>

            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className={`md:hidden flex flex-col gap-4 bg-white/90 p-4 rounded-lg transition-all duration-300 
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
          >
            {['products', 'calculator', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-base text-gray-700 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 z-50
          ${showScrollTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-5'}`}
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
};

export default Nav;