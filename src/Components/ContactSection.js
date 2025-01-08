"use client";

import React, { useState, useEffect } from "react";
import "./ContactSection.css";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);

    const handleMouseMove = (e) => {
      const card = document.querySelector('.contact-card');
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
    };

    const handleMouseLeave = () => {
      const card = document.querySelector('.contact-card');
      if (!card) return;
      
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-card">
          <div className="contact-header">
            <div className="coffee-icon">☕</div>
            <h1 className="contact-title">Let's Brew Something Great Together</h1>
            <p className="contact-description">
              Interested in wholesale instant coffee? Fill out the form below, and we'll customize 
              a solution that perfectly matches your business needs.
            </p>
          </div>
          
          <div className="form-container">
            {isLoading && (
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
              </div>
            )}
            <iframe
              src="https://forms.gle/CPCvJ2pPjNZEo5J39"
              className="contact-iframe"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Contact Us Form"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;