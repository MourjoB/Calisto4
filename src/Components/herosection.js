"use client"

import React, { useState, useEffect } from 'react';
import { Coffee, ArrowRight } from 'lucide-react';

const HeroSection = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate particles only on the client side
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            width: Math.random() * 10,
            height: Math.random() * 10,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 2
        }));
        setParticles(newParticles);
    }, []);

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center px-4 py-16"
            style={{
                backgroundImage: 'url("/images/HeroPic.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Subtle Background Particles */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute bg-white/10 rounded-full"
                        style={{
                            width: `${particle.width}px`,
                            height: `${particle.height}px`,
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            animation: 'float 5s infinite',
                            animationDelay: `${particle.delay}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-4xl text-center">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm text-white">
                    <Coffee className="mr-2 text-blue-400" size={20} />
                    Direct from Kushal Nagar Plantations
                </div>

                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
                    Premium Wholesale Coffee
                    <br />
                    <span className="text-blue-400">Best Price in the Market</span>
                </h1>

                <p className="text-xl text-black mb-10 max-w-2xl mx-auto">
                    Are you a Cafe Owner or a Coffee Wholesaler? Maybe you are into Coffee Trading or own a Restaurant. If "Yes", We can Guarantee Premium Grade Coffee at the Best Price in the Market.
                </p>

                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={scrollToContact}
                        className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Get Custom Quote
                        <ArrowRight className="ml-2" size={20} />
                    </button>
                    <button 
                        onClick={scrollToContact}
                        className="flex items-center border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;