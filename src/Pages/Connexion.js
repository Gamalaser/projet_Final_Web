import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import Logo from '../components/Logo';

const Connexion = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="connexion-page">
      {/* Logo centré en haut */}
      <div className="connexion-logo">
        <Logo />
      </div>

      <div className="auth-toggle">
        <button
          className={showLogin ? 'active' : ''}
          onClick={() => setShowLogin(true)}
        >
          Connexion
        </button>
        <button
          className={!showLogin ? 'active' : ''}
          onClick={() => setShowLogin(false)}
        >
          Inscription
        </button>
      </div>

      {showLogin ? <Login /> : <Register />}
    </div>
  );
};

export default Connexion;