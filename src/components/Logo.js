import React from 'react';
import { auth } from '../Tools/firebaseConfig';
import '../styles/components/logo.scss';

const Logo = () => {
  const user = auth.currentUser;
  
  return (
    //ici je modifie le lien du logo en fonction de la connexion de l'utilisateur 
    //pour éviter l'accès aux produits sans connexion
    <a href={user ? "/products" : "#"} className="logo">
      <img src={process.env.PUBLIC_URL + '/logo.png'} alt="OnlineStore Logo" />
    </a>
  );
};

export default Logo;