
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


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

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

export default app;