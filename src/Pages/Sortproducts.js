import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../Tools/Api';
import ProductCard from '../components/ProductCard';
import '../styles/components/sortproducts.scss';

const Sortproducts = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setSortedProducts(data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    let sorted = [...products];

    if (order === 'asc') {
      // Tri croissant (du moins cher au plus cher)
      sorted.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      // Tri décroissant (du plus cher au moins cher)
      sorted.sort((a, b) => b.price - a.price);
    } else {
      // Par défaut donc par ordre original
      sorted = [...products];
    }

    setSortedProducts(sorted);
  };

  if (loading) {
    return <div className="loading-container">Chargement des produits...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="sortproducts-page">
      <div className="page-header">
        <h1>Trier les produits par prix</h1>
      </div>

      <div className="sort-controls">
        <button
          className={sortOrder === 'default' ? 'active' : ''}
          onClick={() => handleSort('default')}
        >
          Par défaut
        </button>
        <button
          className={sortOrder === 'asc' ? 'active' : ''}
          onClick={() => handleSort('asc')}
        >
          Prix croissant ↑
        </button>
        <button
          className={sortOrder === 'desc' ? 'active' : ''}
          onClick={() => handleSort('desc')}
        >
          Prix décroissant ↓
        </button>
      </div>

      <div className="products-grid">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Sortproducts;