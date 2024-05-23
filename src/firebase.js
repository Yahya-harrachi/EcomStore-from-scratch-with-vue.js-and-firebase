
require("firebase/firestore");
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import getStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATmu8IQB9aM3HC2PQAVFHzyBLyjxxYLrA",
  authDomain: "ecomstorevue.firebaseapp.com",
  projectId: "ecomstorevue",
  storageBucket: "ecomstorevue.appspot.com",
  messagingSenderId: "801223901317",
  appId: "1:801223901317:web:fbd6a98abadd1e3bc1a9ec",
  measurementId: "G-L22JND1F49",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get the Auth object for authentication
const auth = getAuth(firebaseApp);

// Get the Firestore object for database operations
const db = getFirestore(firebaseApp);

// Initialize Firebase Storage
const storage = getStorage(firebaseApp); // Initialize storage

export { auth, db, firebaseApp, storage }; // Export storage

