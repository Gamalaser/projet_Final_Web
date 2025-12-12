import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart } from '../Tools/Api';
import { auth } from '../Tools/firebaseConfig';
import CartDetails from '../components/cartdetails';
import '../styles/components/cart.scss';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const userEmail = auth.currentUser?.email;
      if (userEmail) {
        const data = await getCart(userEmail);
        console.log('Items du panier récupérés:', data); 
        setCartItems(data);
      }
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement du panier');//important pour l'utilisateur
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      console.log('Tentative de suppression - ID:', itemId); 
      await removeFromCart(itemId);
      console.log('Suppression réussie !'); // Debug
      // Recharger le panier après suppression
      await fetchCart();
    } catch (err) {
      console.error('Erreur complète:', err); // Debug détaillé
      console.error('Réponse serveur:', err.response); // Debug serveur
      alert('Erreur lors de la suppression du produit');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  if (loading) {
    return <div className="loading-container">Chargement du panier...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Mon Panier</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Votre panier est vide</h2>
          <p>Ajoutez des produits pour commencer vos achats !</p>
          <a href="/products" className="btn-shop">
            Continuer mes achats
          </a>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartDetails 
                key={item.id} 
                item={item} 
                onRemove={handleRemoveFromCart}
              />
            ))}
          </div>

          <div className="cart-summary">
            <h2>Résumé de la commande</h2>
            <div className="summary-row">
              <span>Nombre d'articles:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
            <button className="btn-checkout">
              Procéder au paiement
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;