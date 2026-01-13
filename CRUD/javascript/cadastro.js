import { auth } from "/firebase/firebaseconfig.js";
import { createUserWithEmailAndPassword } from 'firebase/auth'

const register = () => {
let email = document.getElementById("email").value;
let senha = document.getElementById("password").value;
let senhaConfirm = document.getElementById("passwordConfirm").value;

if (email !== "" && senha !== ""){
    if (senha === senhaConfirm){
        createUserWithEmailAndPassword(auth, email, senha).then((resultado) =>{
            alert("Usuário criado com sucesso!")
            window.location.href = "index.html"
        }).catch((error) =>{
            alert("Criação do usuário falhou. Tente novamente." + error.message)
        })
    } else{
        alert("As senhas não coincidem. tente novamente")
    }
} else{
    alert("Insira os dados corretamente")
}
}