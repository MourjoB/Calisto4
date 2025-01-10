"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Menu, X, Phone } from "lucide-react";
import Image from "next/image";

const NAV_ITEMS = ["Products", "Calculator", "About"];

const NavMenuItem = ({ label, onClick, isMobile = false }) => (
  <motion.button
    whileHover={isMobile ? {} : { y: -2 }}
    onClick={() => onClick(label.toLowerCase())}
    className={`
      ${isMobile ? "w-full p-4" : "px-4 py-2 group relative"} 
      flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-all
    `}
  >
    <span>{label}</span>
    {!isMobile && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
    )}
  </motion.button>
);

const ContactButton = ({ onClick, isMobile = false }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      ${isMobile ? "w-full p-4" : "px-6 py-3"} 
      flex items-center justify-center bg-blue-600 text-white rounded-full hover:shadow-lg
    `}
  >
    <Phone size={16} /> <span>Contact Us</span>
  </motion.button>
);

const ScrollProgressBar = ({ progress }) => (
  <motion.div
    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"
    animate={{ scaleX: progress / 100 }}
    transition={{ duration: 0.1 }}
  />
);

const MobileMenu = ({ isOpen, onClose, onNavClick }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="fixed inset-x-0 top-20 bg-white shadow-lg"
      >
        {NAV_ITEMS.map((label) => (
          <NavMenuItem key={label} label={label} onClick={(id) => { onNavClick(id); onClose(); }} isMobile />
        ))}
        <ContactButton onClick={onClose} isMobile />
      </motion.div>
    )}
  </AnimatePresence>
);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollData, setScrollData] = useState({ progress: 0, showScrollTop: false });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      setScrollData({
        progress: (scrollY / (scrollHeight - innerHeight)) * 100,
        showScrollTop: scrollY > 400,
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 ${scrollData.progress > 0 ? "bg-white shadow-lg" : "bg-transparent"}`}
      >
        <div className="container mx-auto flex items-center justify-between p-4">
          <Image src="/images/Calisto.png" alt="Logo" width={48} height={48} onClick={() => scrollToSection("hero")} />

          <div className="hidden md:flex items-center space-x-4">
            {NAV_ITEMS.map((label) => (
              <NavMenuItem key={label} label={label} onClick={scrollToSection} />
            ))}
            <ContactButton onClick={() => scrollToSection("contact")} />
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <ScrollProgressBar progress={scrollData.progress} />
      </motion.nav>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} onNavClick={scrollToSection} />

      <AnimatePresence>
        {scrollData.showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
