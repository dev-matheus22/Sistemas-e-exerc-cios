import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword } from 
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const form = document.getElementById("loginForm");

const login = async () => {
  const emailInput = document.getElementById("email");
  if (!emailInput) return;
  const email = emailInput.value;

  const senhaInput = document.getElementById("password");
  if (!senhaInput) return;
  const senha = senhaInput.value;

  if (!email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    alert("Login realizado!");
    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    alert("Login falhou");
  }
};

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });
}
