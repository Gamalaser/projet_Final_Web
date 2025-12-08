// src/components/Logo.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/logo.scss';

const Logo = () => {
  return (
    <Link to="/products" className="logo">
      <h1>🛍️ OnlineStore</h1>
    </Link>
  );
};

export default Logo;