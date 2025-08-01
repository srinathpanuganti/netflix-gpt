// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPcLLtypCvzSngA4rpRsMEu6-F6eA0qc4",
  authDomain: "netflixgpt-b1a2f.firebaseapp.com",
  projectId: "netflixgpt-b1a2f",
  storageBucket: "netflixgpt-b1a2f.firebasestorage.app",
  messagingSenderId: "787595257373",
  appId: "1:787595257373:web:9165a48e43d691223b88f4",
  measurementId: "G-ZBLG97VVQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
