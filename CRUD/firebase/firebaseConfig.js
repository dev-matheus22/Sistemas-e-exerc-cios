// Import SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

// Configuração do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyBVWnxIVFU4kMlUixgzkMxBuuD-6uypxKA",
  authDomain: "crud-c895a.firebaseapp.com",
  projectId: "crud-c895a",
  storageBucket: "crud-c895a.firebasestorage.app",
  messagingSenderId: "762290888625",
  appId: "1:762290888625:web:ae605f6a35be9e44446790"
};

// Inicializa o app
export const app = initializeApp(firebaseConfig);

// Inicializa a autenticação
export const auth = getAuth(app);

export const db = getFirestore(app)
