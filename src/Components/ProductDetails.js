"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ProductDetails.css";

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      name: "100% Spray Dried",
      image: "/images/SD.png",
      description: "Traditional spray-dried process resulting in fine, consistent granules.",
      message: "Best price in the market",
    },
    {
      name: "100% Agglomerated",
      image: "/images/Agglo.png",
      description: "Advanced agglomeration process for superior dissolving properties.",
      message: "Best price in the market",
    },
    {
      name: "51:49 Agglomerated",
      image: "/images/5149 Agglo.png",
      description: "Premium freeze-dried process preserving authentic coffee flavor.",
      message: "Best price in the market",
    },
    {
      name: "70:30 Spray Dried",
      image: "/images/7030 SD.png",
      description: "Ultra-fine microground coffee for enhanced aroma and taste.",
      message: "Best price in the market",
    },
    {
      name: "51:49 Spray Dried",
      image: "/images/5149 SD.png",
      description: "Specially formulated instant coffee optimized for cold brew preparation.",
      message: "Best price in the market",
    },
    {
      name: "51:49 Agglomerated",
      image: "/images/5149 Agglo.png",
      description: "Premium specialty grade coffee processed for maximum flavor retention.",
      message: "Best price in the market",
    },
  ];

  const productsPerCard = 4;
  const totalProducts = products.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(totalProducts / productsPerCard));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(totalProducts / productsPerCard) - 1 : prevIndex - 1
    );
  };

  const createProductCards = () => {
    const startIdx = currentIndex * productsPerCard;
    const cardProducts = products.slice(startIdx, startIdx + productsPerCard);
    return (
      <div className="product-card">
        {cardProducts.map((product, index) => (
          <div key={index} className="product-item">
            <div className="image-wrapper">
              <img
                src={product.image}
                alt={'${product.name} Instant Coffee'}
                className="product-image"/>
              <span className="new-badge">New</span>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-message">{product.message}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id= "products" className="carousel-section" >
      <h2 className="section-title">Our Instant Coffee Range</h2>
      <div className="carousel-container">
        <button
          onClick={prevSlide}
          className="nav-button prev-button"
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>
        <div className="products-container">
          <div className="products-slider">{createProductCards()}</div>
        </div>
        <button
          onClick={nextSlide}
          className="nav-button next-button"
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;