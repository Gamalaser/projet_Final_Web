import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, addToCart } from '../Tools/Api';
import { auth } from '../Tools/firebaseConfig';
import '../styles/components/detailsproducts.scss';

const Detailsproducts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement du produit');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      const userEmail = auth.currentUser?.email;
      
      // NE PAS mettre d'ID ici - JSON Server le génère automatiquement
      const cartItem = {
        emailUser: userEmail,
        image: product.image,
        title: product.title,
        category: product.category,
        price: product.price,
        productId: product.id  // Garde l'ID du produit dans un champ séparé
      };

      await addToCart(cartItem);
      alert('Produit ajouté au panier !');
    } catch (err) {
      console.error('Erreur lors de l\'ajout au panier:', err);
      alert('Erreur lors de l\'ajout au panier. Assurez-vous que JSON Server est lancé.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Chargement du produit...</div>;
  }

  if (error || !product) {
    return <div className="error-container">{error || 'Produit non trouvé'}</div>;
  }

  return (
    <div className="detailsproducts-page">
      <div className="product-details">
        <div className="product-image-large">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-info-detailed">
          <h1>{product.title}</h1>
          
          <div className="product-category">
            <span>Catégorie:</span>
            <span className="category-name">{product.category}</span>
          </div>

          <div className="product-rating">
            <span>Note: {product.rating?.rate} ⭐</span>
            <span>({product.rating?.count} avis)</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-price-large">
            ${product.price}
          </div>

          <button 
            className="btn-add-to-cart"
            onClick={handleAddToCart}
            disabled={addingToCart}
          >
            {addingToCart ? 'Ajout en cours...' : 'Add to cart'}
          </button>

          <a href="/products" className="btn-back">
            ← Retour aux produits
          </a>
        </div>
      </div>
    </div>
  );
};

export default Detailsproducts;