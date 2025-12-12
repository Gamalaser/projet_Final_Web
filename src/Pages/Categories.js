import React, { useState, useEffect } from 'react';
import { getAllProducts, getAllCategories, getProductsByCategory } from '../Tools/Api';
import ProductCard from '../components/ProductCard';
import '../styles/components/categories.scss';

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  const fetchCategoriesAndProducts = async () => {
    try {
      setLoading(true);
      const [categoriesData, productsData] = await Promise.all([
        getAllCategories(),
        getAllProducts()
      ]);
      setCategories(categoriesData);
      setProducts(productsData);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setLoading(true);

    try {
      if (category === 'all') {
        const data = await getAllProducts();
        setProducts(data);
      } else {
        const data = await getProductsByCategory(category);
        setProducts(data);
      }
      setError('');
    } catch (err) {
      setError('Erreur lors du filtrage');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    handleCategoryChange('all');
  };

  if (loading && categories.length === 0) {
    return <div className="loading-container">Chargement...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Filtrer par catégorie</h1>
      </div>

      <div className="categories-filter">
        <button
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => handleCategoryChange('all')}
        >
          Toutes les catégories
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}

        <button className="btn-reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      {loading ? (
        <div className="loading-container">Chargement des produits...</div>
      ) : (
        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products">Aucun produit trouvé dans cette catégorie</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;