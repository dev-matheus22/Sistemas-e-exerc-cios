import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHWYbbo0vxmSt8cQUnip2-9mD8i9Clpc8",
  authDomain: "product-manager-e73df.firebaseapp.com",
  projectId: "product-manager-e73df",
  storageBucket: "product-manager-e73df.appspot.com",
  messagingSenderId: "245437982465",
  appId: "1:245437982465:web:84b3e0b9675ddf4fc5dd00"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
