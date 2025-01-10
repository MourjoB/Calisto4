import React from "react";
import Nav from "../Components/Nav";
import HeroSection from "../Components/herosection";
import ProductDetails from "../Components/ProductDetails";
import AboutSection from "../Components/AboutSection";
import ContactSection from "../Components/ContactSection";
import Footer from "../Components/Footer";
import '../styles.css';
import './globals.css';
import QuoteCalculator from '../Components/Calculator';  // Updated import

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <ProductDetails />
      <QuoteCalculator />  {/* Changed from Calculator to QuoteCalculator */}
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}