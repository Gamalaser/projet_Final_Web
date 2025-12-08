// src/App.js
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
    // Écouter les changements d'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  // Composant de protection des routes
  const ProtectedRoute = ({ component: Component, ...rest }) => {
    if (loading) {
      return (
        <Route
          {...rest}
          render={() => <div className="loading">Chargement...</div>}
        />
      );
    }

    return (
      <Route
        {...rest}
        render={(props) =>
          user ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  };

  return (
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
          <ProtectedRoute path="/products" component={Allproducts} />
          <ProtectedRoute path="/categories" component={Categories} />
          <ProtectedRoute path="/sort" component={Sortproducts} />
          <ProtectedRoute path="/product/:id" component={Detailsproducts} />
          <ProtectedRoute path="/cart" component={Cart} />

          {/* Route 404 */}
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;