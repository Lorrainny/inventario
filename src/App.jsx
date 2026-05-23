// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDRqkCsziMnpWTQyxPEkquTHv2uEq1K4A",
  authDomain: "inventario-e6fe2.firebaseapp.com",
  projectId: "inventario-e6fe2",
  storageBucket: "inventario-e6fe2.firebasestorage.app",
  messagingSenderId: "247347787671",
  appId: "1:247347787671:web:97344e318bda3649bf36d2",
  measurementId: "G-RQN7J6VH4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
