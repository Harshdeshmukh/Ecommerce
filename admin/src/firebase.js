// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBck_9O4pzCMhLRpN2vWmZ-sC0M1WApAVk",
  authDomain: "eccomerce-shop-mern.firebaseapp.com",
  projectId: "eccomerce-shop-mern",
  storageBucket: "eccomerce-shop-mern.appspot.com",
  messagingSenderId: "138232076625",
  appId: "1:138232076625:web:9532be1f7d30a068a7db70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
