import { db } from "../firebase/firebaseConfig.js";
import { addDoc, collection, Timestamp, doc, getDocs, getFirestore, query, where, updateDoc, deleteDoc }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


let participantes: Participante[] = []
let idUnico = 0;
let sorteados: Sorteio[] = []

interface Participante {
readonly id: number,
nome: string | undefined
}

interface Resultado {

}

interface Sorteio {

}

const shuffleYates = (arrayEmbaralhado) => {
    let currentIndex = arrayEmbaralhado.length,
        randomIndex;

    while (currentIndex != 0) {
        
        randomIndex = Math.floor(Math.random() * currentIndex)

        currentIndex--;

        [arrayEmbaralhado[currentIndex], arrayEmbaralhado[randomIndex]] = [arrayEmbaralhado
        [randomIndex], arrayEmbaralhado[currentIndex]
        ]
    }
    return arrayEmbaralhado
}

const sortear = () => {
    let copiaArray = arrayNomes.map(nomes => nomes.participante)
    shuffleYates(copiaArray);
    sorteados = [];
    for (let i = 0; i < copiaArray.length; i++) {
        let atual = copiaArray[i];
        let proximo = i + 1;

        if (proximo === copiaArray.length) {
            proximo = 0;
        }

        let amigoSecreto = copiaArray[proximo];

        sorteados.push({de: atual, tirou: amigoSecreto})
    }

    mostrarResultado()
}

const mostrarResultado = () => {
    let containerResultado = document.getElementById("container-resultado")
    containerResultado.innerHTML = ""

    for (const resultado of sorteados){
        let lista = document.createElement("li")
        let span = document.createElement("span")

        lista.classList.add("lista-sorteado")
        span.classList.add("span-lista")

        span.innerText = `${resultado.de} tirou ${resultado.tirou}`

        lista.appendChild(span)
        containerResultado.appendChild(lista)
    }
}

const verifyData = () => {
    const dados = catchNmae();

    
    if(dados.nome?.toLowerCase().trim() === ""){
        return 
    };

    return dados;
}

const catchNmae = () => {
    const nome = document.getElementById("nome") as HTMLInputElement;
    const nomeParticipante: string = nome.value.trim();

    const objParticipante: Participante = {
        id: Timestamp.now(),
        nome: nomeParticipante
    }

    return objParticipante;
}

const addParticipantes = async () => {
const dadosParticipante = verifyData()
const now = dadosParticipante?.id
try {
    const docRef = await addDoc(collection(db, "participantes"),{
        id: now,
        nome: dadosParticipante?.nome
    })

    let ptcObj = {
        id: now,
        nome: dadosParticipante?.nome
    }
    participantes.push(ptcObj)

} catch(error){
    alert("Erro ao adicionar participante")
    console.error(error)
}

    // if (nome === "") {
    //     alert("Informe um nome")
    // } else {
    //     let objNome = {
    //         participante: nome,
    //         id: idUnico,
    //     }
    //     idUnico++
    //     arrayNomes.push(objNome)
    // }
    // document.getElementById("nome").value = "";
    // mostrarLista()
}

const mostrarLista = () => {
    let elemento = document.getElementById("lista")
    elemento.innerHTML = ""

    for (const nome of arrayNomes) {
        let listaElemento = document.createElement("li")
        let listaSpan = document.createElement("span")
        let btnRemover = document.createElement("button")

        btnRemover.innerText = "Remover"

        btnRemover.classList.add("btn")
        elemento.classList.add("elemento-item")
        listaElemento.classList.add("lista-elemento-item")
        listaSpan.classList.add("lista-span-item")

        btnRemover.setAttribute("data-remove", nome.id);
        btnRemover.addEventListener("click", removerParticipante)

        listaSpan.innerText = nome.participante;
        listaElemento.appendChild(listaSpan)
        listaElemento.appendChild(btnRemover)
        elemento.appendChild(listaElemento)
    }
}

const resetar = () => {
arrayNomes = []
sorteados = []
idUnico = 0
mostrarLista();
document.getElementById("container-resultado").innerHTML = ""
}

const removerParticipante = (e) => {
    e.target;
    let chosenId = Number(e.target.dataset.remove)
    let removedPerson = arrayNomes.filter(removedPersonId => removedPersonId.id !== chosenId)
    arrayNomes = removedPerson
    mostrarLista();
}