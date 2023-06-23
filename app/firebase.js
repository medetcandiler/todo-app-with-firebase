// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8ZhIuA5OSQMLwW9eaYVH7CM1grr2a79I",
  authDomain: "todo-app-9685c.firebaseapp.com",
  projectId: "todo-app-9685c",
  storageBucket: "todo-app-9685c.appspot.com",
  messagingSenderId: "999934032442",
  appId: "1:999934032442:web:0ebb31564f42be2cf61303",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
