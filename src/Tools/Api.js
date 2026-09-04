import axios from 'axios';
import { db } from './firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const FAKESTORE_API = 'https://fakestoreapi.com';

// ===== PRODUITS (Fake Store API) — inchangé =====

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

// ===== PANIER (Firestore) =====

// Récupérer le panier d'un utilisateur
export const getCart = async (emailUser) => {
  try {
    const q = query(
      collection(db, 'cart'),
      where('emailUser', '==', emailUser)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    throw error;
  }
};

// Ajouter un produit au panier
export const addToCart = async (product) => {
  try {
    // On retire un éventuel "id" pour laisser Firestore en générer un
    const { id, ...productData } = product;
    const docRef = await addDoc(collection(db, 'cart'), productData);
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    throw error;
  }
};

// Supprimer un produit du panier
export const removeFromCart = async (cartItemId) => {
  try {
    await deleteDoc(doc(db, 'cart', String(cartItemId)));
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du panier:', error);
    throw error;
  }
};