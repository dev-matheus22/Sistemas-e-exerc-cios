import { auth } from "./firebaseConfig.js";

import { createUserWithEmailAndPassword } from 
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const form = document.getElementById("registerForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    register();
  });
}

const register = async () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;
  const senhaConfirm = document.getElementById("passwordConfirm").value;

  if (!email.includes("@")) {
    alert("Email inválido");
    return;
  }

  if (senha.length < 8) {
    alert("A senha precisa ter pelo menos 8 caracteres");
    return;
  }

  if (senha !== senhaConfirm) {
    alert("As senhas não coincidem");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Usuário criado com sucesso!");
    window.location.href = "index.html"
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
