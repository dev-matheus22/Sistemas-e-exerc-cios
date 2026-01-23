import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth"

const login = async (): Promise<void> => {
    const emailInput = document.getElementById("email") as HTMLInputElement | null
    if (!emailInput) return
    const email = emailInput.value


    const senhaInput = document.getElementById("password") as HTMLInputElement | null
    if (!senhaInput) return;
    const senha = senhaInput.value

    if (!email || !senha) {
        alert("Preencha todos os campos")
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, senha)
        window.location.href = "index.html"
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error)
            alert("Criação do usuário falhou. Tente novamente: " + error.message);
        } else {
            console.error(error);
            alert("Criação do usuário falhou. Tente novamente.");
        }
    }
}