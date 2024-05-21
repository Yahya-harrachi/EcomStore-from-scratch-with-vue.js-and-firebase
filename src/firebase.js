import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATmu8IQB9aM3HC2PQAVFHzyBLyjxxYLrA",
  authDomain: "ecomstorevue.firebaseapp.com",
  projectId: "ecomstorevue",
  storageBucket: "ecomstorevue.appspot.com",
  messagingSenderId: "801223901317",
  appId: "1:801223901317:web:fbd6a98abadd1e3bc1a9ec",
  measurementId: "G-L22JND1F49",
};
const firebaseApp = initializeApp(firebaseConfig);

// Get the Auth object for authentication
export const auth = getAuth(firebaseApp);
