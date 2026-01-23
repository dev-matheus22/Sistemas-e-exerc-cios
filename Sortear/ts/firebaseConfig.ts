// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVQzDX1mt3Dtjr-2pZXV7SJRWKxc1JGzw",
  authDomain: "amigo-secreto-ba615.firebaseapp.com",
  projectId: "amigo-secreto-ba615",
  storageBucket: "amigo-secreto-ba615.firebasestorage.app",
  messagingSenderId: "72815685466",
  appId: "1:72815685466:web:bc0f2e5c9188adb4010d63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
