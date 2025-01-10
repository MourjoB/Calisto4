"use client";

import React, { useState, useEffect, useCallback, memo } from 'react';
import { Coffee, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Constants
const PARTICLE_COUNT = 50;
const HERO_TAGLINE = "Direct from Kushal Nagar Plantations";
const HERO_TITLE = "Premium Wholesale Coffee";
const HERO_SUBTITLE = "Best Price in the Market";
const HERO_DESCRIPTION = "Are you a Cafe Owner or a Coffee Wholesaler? Maybe you are into Coffee Trading or own a Restaurant. If \"Yes\", We can Guarantee Premium Grade Coffee at the Best Price in the Market.";

// Memoized Particle component for better performance
const Particle = memo(({ width, height, left, top, delay }) => (
  <div
    className="absolute bg-white/10 rounded-full animate-float"
    style={{
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${delay}s`,
    }}
  />
));

Particle.displayName = 'Particle';

// Memoized button component
const ActionButton = memo(({ variant = 'primary', onClick, children }) => {
  const baseStyles = "flex items-center px-6 py-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "border border-white/20 text-white hover:bg-white/10 focus:ring-white/50"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
});

ActionButton.displayName = 'ActionButton';

// Main Hero Component
const HeroSection = () => {
  const [particles, setParticles] = useState([]);

  // Generate particles with memoized calculation
  useEffect(() => {
    const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      width: 3 + Math.random() * 7, // Constrained size for better performance
      height: 3 + Math.random() * 7,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  // Memoized scroll handler
  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-slate-900 text-gray-200 font-inter leading-relaxed overflow-hidden">
      {/* Background Image with Next.js Image component for better optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/HeroPic.webp"
          alt="Hero Background"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Particles Container */}
      <div className="absolute inset-0 overflow-hidden opacity-20 z-[2]">
        {particles.map((particle) => (
          <Particle key={particle.id} {...particle} />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-[3] min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl text-center">
          {/* Tag Line */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm text-white">
            <Coffee className="mr-2 text-blue-400" size={20} />
            {HERO_TAGLINE}
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
            {HERO_TITLE}
            <br />
            <span style={{ color: '#D2B48C' }}>{HERO_SUBTITLE}</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white mb-10 max-w-2xl mx-auto">
            {HERO_DESCRIPTION}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
            <ActionButton variant="primary" onClick={scrollToContact}>
              Get Custom Quote
              <ArrowRight className="ml-2" size={20} />
            </ActionButton>
            <ActionButton variant="secondary" onClick={scrollToContact}>
              Learn More
            </ActionButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;