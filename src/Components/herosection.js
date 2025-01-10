"use client";

import React from 'react';
import { ArrowRight, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => (
  <section className="relative min-h-screen">
    {/* Background */}
    <div className="absolute inset-0 bg-[url('/images/HeroPic.webp')] bg-cover bg-center" />
    <div className="absolute inset-0 bg-black/50" />
    
    {/* Content */}
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center bg-[#8B4513]/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
        >
          <Coffee className="mr-2 text-[#D2B48C]" size={20} />
          <span className="text-sm text-white font-medium">Direct from Kushal Nagar Plantations</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <span className="text-blue-500">Premium Wholesale Coffee</span>
          <span className="block text-blue-400">Best Price in the Market</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg text-white/90 mb-8"
        >
          Are you a Cafe Owner or a Coffee Wholesaler? Maybe you are into Coffee Trading or own a Restaurant. 
          If "Yes", We can Guarantee Premium Grade Coffee at the Best Price in the Market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-center px-6 py-3 rounded-full bg-[#8B4513] hover:bg-[#654321] text-white shadow-lg"
          >
            Get Custom Quote
            <ArrowRight className="ml-2" size={16} />
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10"
          >
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;