// src/Pages/Connexion.js
import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Connexion = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="connexion-page">
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