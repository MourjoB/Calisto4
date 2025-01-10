"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Phone, ChevronUp, Menu, X, ShoppingBag, Info, Calculator } from 'lucide-react';
import Image from 'next/image';

const NAV_ITEMS = [
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'calculator', label: 'Calculator', icon: Calculator },
  { id: 'about', label: 'About', icon: Info }
];

const NavMenuItem = ({ item, onClick, isMobile = false }) => {
  const Icon = item.icon;
  
  if (isMobile) {
    return (
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        onClick={() => onClick(item.id)}
        className="flex items-center w-full p-4 space-x-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Icon size={18} />
        <span>{item.label}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={() => onClick(item.id)}
      className="group relative px-4 py-2"
    >
      <span className="relative z-10 text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
        {item.label}
      </span>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

const ContactButton = ({ onClick, isMobile = false }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      flex items-center justify-center space-x-2 
      bg-gradient-to-r from-blue-600 to-blue-700 
      text-white font-semibold rounded-full transition-shadow
      hover:shadow-lg hover:shadow-blue-500/25
      ${isMobile ? 'w-full p-4' : 'px-6 py-3'}
    `}
  >
    <Phone size={16} className="animate-bounce" />
    <span>Contact Us</span>
  </motion.button>
);

const ScrollProgressBar = ({ progress }) => (
  <motion.div
    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 origin-left"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: progress / 100 }}
    transition={{ duration: 0.1 }}
  />
);

const MobileMenu = ({ isOpen, onClose, onNavClick }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-x-0 top-20 p-4 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg md:hidden"
      >
        <div className="flex flex-col space-y-2">
          {NAV_ITEMS.map(item => (
            <NavMenuItem
              key={item.id}
              item={item}
              onClick={(id) => {
                onNavClick(id);
                onClose();
              }}
              isMobile
            />
          ))}
          <ContactButton
            onClick={() => {
              onNavClick('contact');
              onClose();
            }}
            isMobile
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollData, setScrollData] = useState({
    progress: 0,
    isScrolled: false,
    showScrollTop: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      setScrollData({
        progress: (scrollY / (docHeight - winHeight)) * 100,
        isScrolled: scrollY > 20,
        showScrollTop: scrollY > 400
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-300 ease-in-out
          ${scrollData.isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}
        `}
      >
        <div className="container mx-auto px-4">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-12 w-12 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              <Image
                src="/images/Calisto.png"
                alt="Logo"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map(item => (
                <NavMenuItem
                  key={item.id}
                  item={item}
                  onClick={scrollToSection}
                />
              ))}
              <ContactButton onClick={() => scrollToSection('contact')} />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        <ScrollProgressBar progress={scrollData.progress} />
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNavClick={scrollToSection}
      />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrollData.showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl z-50"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;