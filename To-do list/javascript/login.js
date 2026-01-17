import { auth } from "/firebase/firebaseconfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const login = async () => {
    let email = document.getElementById("email").value.trim()
    let senha = document.getElementById("password").value.trim()

 if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, senha);
        window.location.href = "index.html";
    } catch (error) {
        console.error(error);
        alert("Usuário ou senha inválidos.");
    }
}