import React from 'react';
//import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Tools/firebaseConfig';
import Logo from './Logo';
import '../styles/components/navigation.scss';

const Navigation = () => {
  //const history = useHistory();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      //ici je  Force une redirection complète vers la page d'accueil
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="navigation-wrapper">
      <div className="logo-section"> 
        <Logo />
      </div>

      <nav className="navigation">
        <div className="nav-container">
          <ul className="nav-links">
            <li>
              <a href="/products">Tous les produits</a>
            </li>
            <li>
              <a href="/categories">Catégories</a>
            </li>
            <li>
              <a href="/sort">Trier</a>
            </li>
            <li>
              <a href="/cart" className="cart-link">
                🛒 Panier
              </a>
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
    </div>
  );
};

export default Navigation;