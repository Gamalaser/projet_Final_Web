import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Tools/firebaseConfig';
//import { useHistory } from 'react-router-dom';
import '../styles/components/register.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  //const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    // ici faut Vérifier la longueur du mot de passe
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirection vers la page des produits après inscription réussie
      window.location.href = '/products';
    } catch (err) {
      // ici on gère les erreurs
      if (err.code === 'auth/email-already-in-use') {
        setError('Cet email est déjà utilisé.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Email invalide.');
      } else if (err.code === 'auth/weak-password') {
        setError('Le mot de passe est trop faible.');
      } else {
        setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
      console.error('Erreur d\'inscription:', err);
    } finally {
      setLoading(false);
    }
  };

  // ici c'est le retour du formulaire d'inscription
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Inscription</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Au moins 6 caractères"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;