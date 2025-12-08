// src/Pages/Allproducts.js
import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../Tools/Api';
import ProductCard from '../components/ProductCard';
import '../styles/components/allproducts.scss';

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('flex'); // 'flex' ou 'carousel'
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return <div className="loading-container">Chargement des produits...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="allproducts-page">
      <div className="page-header">
        <h1>Tous les produits</h1>
        <div className="view-toggle">
          <button
            className={viewMode === 'flex' ? 'active' : ''}
            onClick={() => setViewMode('flex')}
          >
            Vue Grille
          </button>
          <button
            className={viewMode === 'carousel' ? 'active' : ''}
            onClick={() => setViewMode('carousel')}
          >
            Vue Carrousel
          </button>
        </div>
      </div>

      {viewMode === 'flex' ? (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="products-carousel">
          <button className="carousel-btn prev" onClick={handlePrevious}>
            &#8249;
          </button>
          
          <div className="carousel-content">
            <ProductCard product={products[currentIndex]} />
          </div>
          
          <button className="carousel-btn next" onClick={handleNext}>
            &#8250;
          </button>

          <div className="carousel-indicators">
            {products.map((_, index) => (
              <span
                key={index}
                className={index === currentIndex ? 'active' : ''}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Allproducts;