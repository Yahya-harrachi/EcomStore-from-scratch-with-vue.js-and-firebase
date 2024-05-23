import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
require("firebase/firestore");
import { getFirestore } from "firebase/firestore";

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

export { auth, db };
