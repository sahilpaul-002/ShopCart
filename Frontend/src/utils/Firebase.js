// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import dotenv from 'dotenv';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Load environment variables from .env file
// dotenv.config();
const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
console.log(firebaseApiKey);

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "shopcart-ea07f.firebaseapp.com",
  projectId: "shopcart-ea07f",
  storageBucket: "shopcart-ea07f.firebasestorage.app",
  messagingSenderId: "939712312233",
  appId: "1:939712312233:web:2728e10d6a9d236a394ab8",
  measurementId: "G-R6TMET2QS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};