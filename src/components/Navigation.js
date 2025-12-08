// src/components/Navigation.js
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Tools/firebaseConfig';
import Logo from './Logo';
import '../styles/components/navigation.scss';

const Navigation = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Force une redirection complète vers la page d'accueil
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Logo />
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/products">Tous les produits</Link>
          </li>
          <li>
            <Link to="/categories">Catégories</Link>
          </li>
          <li>
            <Link to="/sort">Trier</Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link">
              🛒 Panier
            </Link>
          </li>
        </ul>

        <div className="nav-auth">
          <span className="user-email">{auth.currentUser?.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;