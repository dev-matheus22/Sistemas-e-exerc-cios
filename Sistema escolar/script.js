let alunos = [];
let dadosAlunos = localStorage.getItem("alunos");
let alunoSelecionadoId = null;

if (dadosAlunos !== null) {
  alunos = JSON.parse(dadosAlunos);
  mostrarLista();
} else {
  alunos = [];
}

let btnAdd = document.getElementById("btnAdicionar");
btnAdd.addEventListener("click", () => {
  let nome = document.getElementById("nome").value.trim();

  if (nome === "") {
    alert("Insira um nome");
    return;
  }

  if (isNaN(nota1) || isNaN(nota2)) {
    alert("Insira um número");
    return;
  }

  let media = (nota1 + nota2) / 2;
  let objAluno = {
    id: Date.now(),
    nome: nome,
    materias: [],
  };

  document.getElementById("nome").value = "";

  alunos.push(objAluno);
  localStorage.setItem("alunos", JSON.stringify(alunos));
  mostrarLista();
});

const criarMateria = () => {
  let materia = document.getElementById("materia").value;
  if (alunoSelecionadoId === null) {
    alert("Operação não pode ser realizada");
    return;
  }

  let alunoEncontrado = alunos.find(
    (aluno) => aluno.id === Number(alunoSelecionadoId)
  );

  if (!alunoEncontrado) {
    alert("Aluno não encontrado");
    return;
  }

  let objMateria = {
    id: Date.now(),
    nomeMateria: materia,
    notas: [],
    media: null,
    status: "Sem notas",
  };
  alunoEncontrado.materias.push(objMateria);
  localStorage.setItem("alunos", JSON.stringify(alunos));
  mostrarLista();
};

let btnOrdenarLista = document.getElementById("btnOrdenar");

btnOrdenarLista.addEventListener("click", () => {
  alunos.sort((a, b) => b.media - a.media);
  localStorage.setItem("alunos", JSON.stringify(alunos));
  mostrarLista();
});

const determinaStatus = (media) => {
  if (media >= 7) {
    return "Aprovado";
  }

  if (media >= 5 && media < 7) {
    return "Recuperação";
  } else {
    return "Reprovado";
  }
};

const mostrarLista = () => {
  let listaAlunos = document.getElementById("listaAlunos");
  listaAlunos.innerHTML = "";

  for (const aluno of alunos) {
    let list = document.createElement("li");
    let spanNome = document.createElement("span");
    let btnMaterias = document.createElement("button");

    btnMaterias.innerText = "Gerenciar materias";
    btnMaterias.setAttribute("data-id", aluno.id);

    btnMaterias.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      alunoSelecionadoId = id;
    });

    list.classList.add("lista-formar");
    spanNome.classList.add("nome-format");
    btnMaterias.classList.add("btn-materias");

    spanNome.innerText = aluno.nome;

    list.appendChild(spanNome);
    list.appendChild(btnMaterias);

    listaAlunos.appendChild(list);
  }
};
