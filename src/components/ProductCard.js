import React from 'react';
import '../styles/components/productcard.scss';

const ProductCard = ({ product }) => {
  return (
    // ici je crée le composant pour afficher les cartes de produits
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price}</p>
        
        <div className="product-actions">
          <a href={`/product/${product.id}`} className="btn-view">
            View item
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;