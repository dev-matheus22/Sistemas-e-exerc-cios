import { auth } from "/firebase/firebaseconfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const login = () => {
    let email = document.getElementById("email").value
    let senha = document.getElementById("password").value

    if (email !== "" && senha !== ""){
        signInWithEmailAndPassword(auth, email, senha).then((resultado) => {
            window.location.href = "index.html"
        }
        ).catch((error) => {
         alert("Usuário ou senha inválidos!", error)
        }
        )
    }
}