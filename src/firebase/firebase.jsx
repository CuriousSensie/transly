// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdPViOlr5NzKCNGXU98yvYG3OmMeED1Bo",
  authDomain: "transly-8ec48.firebaseapp.com",
  projectId: "transly-8ec48",
  storageBucket: "transly-8ec48.appspot.com",
  messagingSenderId: "116120468064",
  appId: "1:116120468064:web:5b9ba032c9d3351556a105",
  measurementId: "G-1QD8M1LZ03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
