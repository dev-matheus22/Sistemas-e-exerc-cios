let arrayNomes = []
let idUnico = 0;
let sorteados = []

const shuffleYates = (arrayEmbaralhado) => {
    let currentIndex = arrayEmbaralhado.length,
        randomIndex;

    while (currentIndex != 0) {
        Math.floor(Math.random() * currentIndex)
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

const addParticipantes = () => {
    let nome = document.getElementById("nome").value.trim();
    if (nome === "") {
        alert("Informe um nome")
    } else {
        let objNome = {
            participante: nome,
            id: idUnico,
        }
        idUnico++
        arrayNomes.push(objNome)
    }
    document.getElementById("nome").value = "";
    mostrarLista()
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