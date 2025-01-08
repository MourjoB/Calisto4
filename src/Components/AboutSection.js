// AboutSection.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Coffee, Factory, Leaf, Award, Clock, Users } from "lucide-react";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("heritage");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector(".about-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    const buttons = document.querySelectorAll(".tab-button");
    buttons.forEach((button) =>
      button.addEventListener("click", (e) => {
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.left = `${e.clientX - button.offsetLeft}px`;
        ripple.style.top = `${e.clientY - button.offsetTop}px`;
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      })
    );

    return () => {
      buttons.forEach((button) =>
        button.removeEventListener("click", () => {})
      );
    };
  }, []);

  const aboutTabs = {
    heritage: {
      title: "Our Heritage",
      description:
        "Founded in the heart of Kushal Nagar, we've been crafting premium instant coffee for over two decades. Our deep-rooted connection with local plantations ensures we deliver nothing but the finest coffee solutions.",
      icon: <Coffee className="tab-icon" />,
      stats: [
        { value: "5+", label: "Years of Excellence" },
        { value: "200+", label: "Business Partners" },
        { value: "50", label: "Coffee Varieties" },
      ],
    },
    sustainability: {
      title: "Sustainability First",
      description:
        "We believe in sustainable farming practices that protect both our environment and our farmers. Every batch of coffee we produce is traceable back to its source, ensuring ethical practices throughout our supply chain.",
      icon: <Leaf className="tab-icon" />,
      stats: [
        { value: "100%", label: "Traceable" },
        { value: "0", label: "Carbon Footprint" },
        { value: "1000+", label: "Farmer Network" },
      ],
    },
    quality: {
      title: "Quality Assurance",
      description:
        "Our state-of-the-art facility combines traditional knowledge with modern technology to create consistently exceptional coffee. Each batch undergoes rigorous quality testing to meet international standards.",
      icon: <Award className="tab-icon" />,
      stats: [
        { value: "IFSC", label: "Certified" },
        { value: "24/7", label: "Quality Control" },
        { value: "100%", label: "Pure Coffee" },
      ],
    },
  };

  const features = [
    {
      icon: <Factory className="feature-icon" />,
      title: "Direct from Source",
      description:
        "No middlemen. We source directly from Kushal Nagar plantations ensuring the best prices.",
    },
    {
      icon: <Clock className="feature-icon" />,
      title: "Quick Turnaround",
      description:
        "From order to delivery, we ensure the fastest processing time in the industry.",
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Custom Solutions",
      description: "Tailored coffee blends to match your unique business requirements.",
    },
  ];

  return (
    <section id="about" className={`about-section ${isVisible ? "visible" : ""}`}>
      <div className="about-container">
        {/* Main Title */}
        <div className="about-header">
          <h2>Why Choose Calisto Coffee?</h2>
          <p>Experience the perfect blend of tradition and innovation</p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <div className="feature-icon-wrapper">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Interactive Tabs Section */}
        <div className="tabs-section">
          {/* Tab Buttons */}
          <div className="tab-buttons">
            {Object.keys(aboutTabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
              >
                <div className="tab-button-content">
                  {aboutTabs[tab].icon}
                  <span>{aboutTabs[tab].title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            <div className="tab-header">
              <h3>{aboutTabs[activeTab].title}</h3>
              <p>{aboutTabs[activeTab].description}</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              {aboutTabs[activeTab].stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
