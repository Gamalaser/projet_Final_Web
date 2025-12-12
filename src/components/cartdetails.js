import React from 'react';
import '../styles/components/cartdetails.scss';

const CartDetails = ({ item, onRemove }) => {
  
  const handleRemove = () => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit du panier ?')) {
      onRemove(item.id);
    }
  };

  return (
    // ici je crée le composant pour afficher les détails du panier
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.title} />
      </div>
      
      <div className="item-details">
        <h3>{item.title}</h3>
        {item.category && <p className="item-category">{item.category}</p>}
        <p className="item-price">${item.price.toFixed(2)}</p>
      </div>

      <button
        className="btn-remove"
        onClick={handleRemove}
      >
        Remove from cart
      </button>
    </div>
  );
};

export default CartDetails;