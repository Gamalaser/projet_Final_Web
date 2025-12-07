// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Es02lpDqz9FG3lkAYCv2dVguFA0C-Rc",
  authDomain: "projetfinalweb-273bd.firebaseapp.com",
  projectId: "projetfinalweb-273bd",
  storageBucket: "projetfinalweb-273bd.firebasestorage.app",
  messagingSenderId: "286662310408",
  appId: "1:286662310408:web:2b423a7b44672694cf2fbd",
  measurementId: "G-026H8ZDN3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);