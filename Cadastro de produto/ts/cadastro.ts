import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";


const form = document.getElementById("registerForm") as HTMLFormElement | null;
if (form) {
    form.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        register();
    });
}



const register = async (): Promise<void> => {
    const emailInput = document.getElementById("email") as HTMLInputElement | null;
    if (!emailInput) return; // evita erro se não existir
    const email: string = emailInput.value;

    const senhaInput = document.getElementById("password") as HTMLInputElement | null;
    if (!senhaInput) return;
    const senha: string = senhaInput.value

    const senhaConfirmInput = document.getElementById("passwordConfirm") as HTMLInputElement | null
    if (!senhaConfirmInput) return;
    const senhaConfirm: string = senhaConfirmInput.value

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





