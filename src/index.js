// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './styles.css';


// Create root element
const root = createRoot(document.getElementById('root'));

// Render your React application
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
