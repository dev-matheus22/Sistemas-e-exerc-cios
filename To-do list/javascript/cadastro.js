import { auth } from "/firebase/firebaseconfig.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let form = document.getElementById("registerForm")

const register = async () => {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("password").value;
    let senhaConfirm = document.getElementById("passwordConfirm").value;

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
        await createUserWithEmailAndPassword(auth, email, senha)
            alert("Usuário criado com sucesso!")
            window.location.href = "index.html";
        }catch (error) {
            console.error(error)
            alert("Criação do usuário falhou. Tente novamente." + error.message)
        }
    } 




form.addEventListener("submit", (e) => {
    e.preventDefault();
    register()
})