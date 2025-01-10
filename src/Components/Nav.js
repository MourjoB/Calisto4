"use client";

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Menu, X, Phone, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useThrottle } from '@/hooks/usethrottle';
import '../app/globals.css'

// Constants
const NAV_ITEMS = [
  { id: 'products', label: 'Products' },
  { id: 'calculator', label: 'Calculator' },
  { id: 'about', label: 'About' }
];

// Component for the navigation items
const NavItem = ({ id, label, onClick }) => (
  <button 
    onClick={() => onClick(id)}
    className="relative text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 font-roboto hover:-translate-y-0.5 group"
  >
    {label}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
  </button>
);

// Component for the contact button
const ContactButton = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-base hover:scale-105 transition-all duration-300"
  >
    <Phone size={16} className="transition-transform duration-300 group-hover:rotate-12" />
    <span>Contact Us</span>
  </button>
);

// Component for the mobile menu button
const MenuButton = ({ isOpen, onClick }) => (
  <button 
    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
    onClick={onClick}
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
);

// Component for the scroll progress bar
const ScrollProgressBar = ({ progress }) => (
  <div 
    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-100"
    style={{ width: `${progress}%` }}
  />
);

// Custom hook for scroll-related state
const useScrollState = () => {
  const [scrollState, setScrollState] = useState({
    isScrolled: false,
    progress: 0,
    showScrollTop: false
  });

  const handleScroll = useThrottle(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / scrollHeight) * 100;

    setScrollState({
      isScrolled: scrollY > 20,
      progress,
      showScrollTop: scrollY > 400
    });
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return scrollState;
};

// Main Navigation Component
const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled, progress, showScrollTop } = useScrollState();

  const scrollToSection = useCallback((sectionId) => {
    if (typeof document === 'undefined') return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const mobileMenuItems = useMemo(() => (
    <div 
      className={`md:hidden flex flex-col gap-4 bg-white/90 p-4 rounded-lg transition-all duration-300 
        ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
    >
      {[...NAV_ITEMS, { id: 'contact', label: 'Contact' }].map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="text-base text-gray-700 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          {label}
        </button>
      ))}
    </div>
  ), [isMenuOpen, scrollToSection]);

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 shadow-lg h-20 flex items-center justify-between px-4 box-border font-poppins
          ${isScrolled ? 'bg-white/90 backdrop-blur-md py-0.5 border-b border-gray-200' : 'bg-transparent py-4'}
          ${isMenuOpen ? 'bg-white' : ''}`}
      >
        <ScrollProgressBar progress={progress} />
        
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center pb-5">
              <div className="relative h-[70px] w-[70px] md:h-[40px] md:w-[40px] cursor-pointer transition-all duration-300 hover:scale-110 -mb-8">
                <Image 
                  src="/images/Calisto.png"
                  alt="Calisto Logo"
                  fill
                  sizes="(max-width: 768px) 70px, 40px"
                  className="object-contain"
                  priority
                  onClick={() => scrollToSection('hero')}
                />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-8">
                {NAV_ITEMS.map(item => (
                  <NavItem 
                    key={item.id} 
                    id={item.id} 
                    label={item.label} 
                    onClick={scrollToSection}
                  />
                ))}
              </div>
              <ContactButton onClick={() => scrollToSection('contact')} />
            </div>

            <MenuButton 
              isOpen={isMenuOpen} 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
            />
          </div>

          {mobileMenuItems}
        </div>
      </nav>

      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 z-50
          ${showScrollTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-5'}`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
};

export default Nav;