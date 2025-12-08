// src/Tools/api.js
import axios from 'axios';

const FAKESTORE_API = 'https://fakestoreapi.com';
const JSON_SERVER_URL = 'http://localhost:3001'; // JSON Server pour le panier

// ===== PRODUITS =====

// Récupérer tous les produits
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${FAKESTORE_API}/products`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
};

// Récupérer toutes les catégories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${FAKESTORE_API}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};

// Récupérer les produits par catégorie
export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${FAKESTORE_API}/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits par catégorie:', error);
    throw error;
  }
};

// Récupérer les détails d'un produit
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${FAKESTORE_API}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    throw error;
  }
};

// ===== PANIER (JSON Server) =====

// Récupérer le panier d'un utilisateur
export const getCart = async (emailUser) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/cart?emailUser=${emailUser}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    throw error;
  }
};

// Ajouter un produit au panier
export const addToCart = async (product) => {
  try {
    const response = await axios.post(`${JSON_SERVER_URL}/cart`, product);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    throw error;
  }
};

// Supprimer un produit du panier
export const removeFromCart = async (cartItemId) => {
  try {
    const response = await axios.delete(`${JSON_SERVER_URL}/cart/${cartItemId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du panier:', error);
    throw error;
  }
};