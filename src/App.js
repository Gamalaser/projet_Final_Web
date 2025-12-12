import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Tools/firebaseConfig';

// Pages
import Connexion from './Pages/Connexion';
import Allproducts from './Pages/Allproducts';
import Categories from './Pages/Categories';
import Sortproducts from './Pages/Sortproducts';
import Detailsproducts from './Pages/Detailsproducts';
import Cart from './Pages/Cart';
import NotFound from './Pages/NotFound';

// Components
import Navigation from './components/Navigation';

// Styles
import './styles/components/app.scss';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //ici on écoute les changements d'authentification
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // ici on nettoie l'écouteur lors du démontage du composant
    return () => unsubscribe();
  }, []);

  // ici c'est le composant pour les routes protégées important pour la gestion de l'authentification
  const ProtectedRoute = ({ component: Component, ...rest }) => {
    if (loading) {
      return (
        //ici on affiche un indicateur de chargement pendant la vérification de l'authentification
        <Route
          {...rest}
          render={() => <div className="loading">Chargement...</div>}
        />
      );
    }

    return (
      // ici on redirige vers la page de connexion si l'utilisateur n'est pas authentifié
      <Route
        {...rest}
        render={(props) =>
          user ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  };

  return (
    // ici on configure le routeur de l'application
    <Router>
      <div className="App">
        {user && <Navigation />}
        
        <Switch>
          {/* Route publique - Connexion */}
          <Route
            exact
            path="/"
            render={() => (user ? <Redirect to="/products" /> : <Connexion />)}
          />

          {/* Routes protégées */}
          {/* ici on utilise le composant ProtectedRoute pour les routes nécessitant une authentification*/}
          <ProtectedRoute path="/products" component={Allproducts} />
          <ProtectedRoute path="/categories" component={Categories} />
          <ProtectedRoute path="/sort" component={Sortproducts} />
          <ProtectedRoute path="/product/:id" component={Detailsproducts} />
          <ProtectedRoute path="/cart" component={Cart} />

          {/*ici on gère la route 404 pour les pages non trouvées */}
          {/* Route 404 */}
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;