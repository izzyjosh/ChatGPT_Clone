// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCllC2z3UHoRqXkBc3JdpZnktj892hlZzQ",
  authDomain: "chatgpt-66419.firebaseapp.com",
  projectId: "chatgpt-66419",
  storageBucket: "chatgpt-66419.firebasestorage.app",
  messagingSenderId: "771589229738",
  appId: "1:771589229738:web:15d22a11f4bebbf7e554d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export default app;
