import React from "react";
import Nav from "./Components/Nav";
import HeroSection from "./Components/herosection";
import ProductDetails from "./Components/ProductDetails";
import AboutSection from "./Components/AboutSection";
import ContactSection from "./Components/ContactSection";
import Footer from "./Components/Footer";
import './styles.css';
import './Components/Calculator'
import { Calculator } from "lucide-react";



function App() {
    return (
        <div className="App">
            <Nav />
            <HeroSection />
            <ProductDetails />
            <Calculator/>
            <AboutSection />
            <ContactSection />
            <Footer />
            
            {/* Other components will go here */}
        </div>
    );
}

export default App;
