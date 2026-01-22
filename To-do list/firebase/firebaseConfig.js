// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVWnxIVFU4kMlUixgzkMxBuuD-6uypxKA",
  authDomain: "crud-c895a.firebaseapp.com",
  projectId: "crud-c895a",
  storageBucket: "crud-c895a.firebasestorage.app",
  messagingSenderId: "762290888625",
  appId: "1:762290888625:web:3b9bbebba83c2ada446790"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
