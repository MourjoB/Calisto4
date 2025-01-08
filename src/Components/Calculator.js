"use client"

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const QuoteCalculator = () => {
    const [coffeeType, setCoffeeType] = useState('spray-dried');
    const [blendRatio, setBlendRatio] = useState('100-pure');
    const [quantity, setQuantity] = useState(1);

    // Base costs for each variant
    const baseCosts = {
        'spray-dried': {
            '100-pure': 710,
            '70-30': 560,
            '51-49': 590
        },
        'algo-dried': {
            '100-pure': 740,
            '70-30': 590,
            '51-49': 620
        }
    };

    // Margin tiers
    const marginTiers = [
        { min: 0, max: 10, margin: 0.30 },
        { min: 10, max: 50, margin: 0.27 },
        { min: 50, max: 200, margin: 0.24 },
        { min: 200, max: 500, margin: 0.21 },
        { min: 500, max: 1500, margin: 0.16 },
        { min: 1500, max: 5000, margin: 0.13 },
        { min: 5000, max: 20000, margin: 0.10 },
        { min: 20000, max: Infinity, margin: 0.07 }
    ];

    const getCurrentTier = (qty) => {
        return marginTiers.find(tier => qty > tier.min && qty <= tier.max);
    };

    const calculatePriceWithMargin = (cost, margin) => {
        return cost / (1 - margin);
    };

    const calculateTotal = () => {
        const baseCost = baseCosts[coffeeType][blendRatio];
        const tier = getCurrentTier(quantity);
        const pricePerKg = calculatePriceWithMargin(baseCost, tier.margin);
        return (pricePerKg * quantity).toFixed(2);
    };

    const getCurrentPrice = () => {
        const baseCost = baseCosts[coffeeType][blendRatio];
        const tier = getCurrentTier(quantity);
        return calculatePriceWithMargin(baseCost, tier.margin).toFixed(2);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    // Calculate price for each tier for the current selection
    const getTierPrices = () => {
        const baseCost = baseCosts[coffeeType][blendRatio];
        return marginTiers.map(tier => ({
            ...tier,
            price: calculatePriceWithMargin(baseCost, tier.margin).toFixed(2)
        }));
    };

    return (
        <div id="calculator" className="calculator-container">
            <div className="calculator-wrapper">
                <div className="calculator-card">
                    {/* Header Section */}
                    <div className="calculator-header">
                        <h2>
                            <Calculator className="calculator-icon" />
                            Quick Quote Calculator
                        </h2>
                        <p>Get an instant price estimate for your wholesale coffee order</p>
                    </div>

                    {/* Calculator Form */}
                    <div className="calculator-form">
                        <div className="form-grid">
                            {/* Coffee Type Selection */}
                            <div className="form-group">
                                <label>Coffee Type</label>
                                <select 
                                    value={coffeeType} 
                                    onChange={(e) => setCoffeeType(e.target.value)}
                                >
                                    <option value="spray-dried">Spray Dried</option>
                                    <option value="algo-dried">Algo Dried</option>
                                </select>
                            </div>

                            {/* Blend Ratio Selection */}
                            <div className="form-group">
                                <label>Blend Ratio</label>
                                <select 
                                    value={blendRatio} 
                                    onChange={(e) => setBlendRatio(e.target.value)}
                                >
                                    <option value="100-pure">100% Pure</option>
                                    <option value="70-30">70:30 Blend</option>
                                    <option value="51-49">51:49 Blend</option>
                                </select>
                            </div>

                            {/* Quantity Input */}
                            <div className="form-group">
                                <label>Quantity (Kgs)</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </div>
                        </div>

                        {/* Price Tiers Info */}
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium mb-2">Price Tiers:</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {getTierPrices().map(tier => (
                                    <div key={tier.min}>
                                        {tier.min + 1}-{tier.max === Infinity ? '20000+' : tier.max} kg: ₹{tier.price}/kg
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Display */}
                        <div className="price-display">
                            <div className="price-content">
                                <div className="price-info">
                                    <h3>Estimated Total</h3>
                                    <p>₹{getCurrentPrice()} per kg × {quantity} kg</p>
                                </div>
                                <div className="price-amount">
                                    <p className="amount">₹{calculateTotal()}</p>
                                    <p className="currency">INR</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="button-group">
                            <button className="primary-button">
                                Request Custom Quote
                            </button>
                            <button className="secondary-button">
                                Save Estimate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteCalculator;