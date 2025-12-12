import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Tools/firebaseConfig';
//import { useHistory } from 'react-router-dom';
import '../styles/components/login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  //const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      //ici je modifie la redirection après connexion
      window.location.href = '/products';
    } catch (err) {
      // ici on gère les erreurs
      if (err.code === 'auth/user-not-found') {
        setError('Aucun utilisateur trouvé avec cet email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Mot de passe incorrect.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Email invalide.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Identifiants invalides.');
      } else {
        setError('Erreur lors de la connexion. Veuillez réessayer.');
      }
      console.error('Erreur de connexion:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ici c'est le retour du formulaire de connexion
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        <form onSubmit={handleLogin}>
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
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;