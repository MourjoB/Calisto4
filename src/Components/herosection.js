"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const CONTENT = {
  tagline: "Direct from Kushal Nagar Plantations",
  title: "Premium Wholesale Coffee",
  subtitle: "Best Price in the Market",
  description: "Are you a Cafe Owner or a Coffee Wholesaler? Maybe you are into Coffee Trading or own a Restaurant. If \"Yes\", We can Guarantee Premium Grade Coffee at the Best Price in the Market."
};

const Button = ({ children, secondary = false, onClick }) => {
  const baseStyles = "flex items-center justify-center px-6 py-3 rounded-full transition-all duration-300 font-medium tracking-wide";
  const styleVariant = secondary 
    ? "border border-white/20 text-white hover:bg-white/10" 
    : "bg-[#8B4513] hover:bg-[#654321] text-white shadow-lg hover:shadow-xl";

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${styleVariant}`}
    >
      {children}
    </button>
  );
};

const Particles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => {
        const left = `${(i * 5) % 100}%`;
        const top = `${(i * 7) % 100}%`;
        const duration = 2 + (i % 3);
        const delay = (i * 0.1) % 2;

        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#D2B48C]/10 rounded-full"
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
            style={{ left, top }}
          />
        );
      })}
    </div>
  );
};

const HeroSection = () => {
  const handleGetQuote = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/images/HeroPic.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/50" />

      <Particles />

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center bg-[#8B4513]/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
          >
            <Coffee className="mr-2 text-[#D2B48C]" size={20} />
            <span className="text-sm text-white font-medium tracking-wide">{CONTENT.tagline}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            <span className="text-blue-500">{CONTENT.title}</span>
            <span className="block text-blue-400">{CONTENT.subtitle}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {CONTENT.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button onClick={handleGetQuote}>
              Get Custom Quote
              <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button secondary onClick={handleGetQuote}>
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;