// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/productcard.scss';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price}</p>
        
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="btn-view">
            View item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;