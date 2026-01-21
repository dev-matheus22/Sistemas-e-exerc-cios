let produtosStorage: Definicao[] = [];
let categoriasFixas = ["Alimentício", "Higiene", "Jardinagem", "Eletrônico"];
let idEmEdicao: number | null = null;




interface Definicao {
  readonly id: number;
  nome: string;
  categoria: string;
  marca?: string | undefined;
  quantidade: number;
  preco: number;
}

interface Entrada {
  nome: string;
  categoria: string;
  marca?: string | undefined;
  quantidade: number;
  preco: number;
}

const atualizarStorage = () => {
  localStorage.setItem("produtosStorage", JSON.stringify(produtosStorage))
}

const pegarDados = () => {
  const nome = document.getElementById("nome") as HTMLInputElement;
  const categoria = document.getElementById("categoria") as HTMLInputElement;
  const marca = document.getElementById("marca") as HTMLInputElement;
  const quantidade = document.getElementById("quantidade") as HTMLInputElement;
  const preco = document.getElementById("preco") as HTMLInputElement;

  const nomeProduto: string = nome.value.trim();
  const categoriaProduto: string = categoria.value.trim();
  const marcaProduto: string = marca.value.trim();
  const quantidadeProduto: number = Number(quantidade.value);
  const precoProduto: number = Number(preco.value);

  const objSimples: Entrada = {
    nome: nomeProduto,
    categoria: categoriaProduto,
    marca: marcaProduto,
    quantidade: quantidadeProduto,
    preco: precoProduto,
  };

  return objSimples;
};

class Produto {
  static validarDados(dados: Entrada) {
    const objErro = {
      erro: "Erro",
    };

    if (dados.nome === "") {
      return { sucesso: false, erro: "Nome não pode estar vazio" };
    }
    if (dados.categoria === "" || !categoriasFixas.includes(dados.categoria)) {
      return { sucesso: false, erro: "Nome não pode estar vazio" };
    }

    if (dados.quantidade < 0) {
      return { sucesso: false, erro: "Nome não pode estar vazio" };
    }
    if (dados.preco < 0) {
      return { sucesso: false, erro: "Nome não pode estar vazio" };
    }

    if (dados.marca?.trim() === "") {
      dados.marca = undefined;
    }

    return { sucesso: true, dados: dados };
  }

  static criarProduto(dados: Entrada) {
    const resultado = Produto.validarDados(dados);
    if (resultado.sucesso === false) {
      return { sucesso: false, erro: "Nome não pode estar vazio" };
    } else {
      let objDefinido: Definicao = {
        id: Date.now(),
        nome: resultado.dados?.nome!,
        categoria: resultado.dados?.categoria!,
        marca: resultado.dados?.marca,
        quantidade: resultado.dados?.quantidade!,
        preco: resultado.dados?.preco!,
      };
      return { sucesso: true, produto: objDefinido };
    }
  }
}

const erroValidacao = () => { };

const editarProduto = (id: number) => {
  for (const produto of produtosStorage) {
    if (produto.id === id) {
      idEmEdicao = id;
      const nomeInput = document.getElementById("nome") as HTMLInputElement;
      nomeInput.value = produto.nome;

      const categoriaInput = document.getElementById("categoria") as HTMLInputElement
      categoriaInput.value = produto.categoria;

      const marcainput = document.getElementById("marca") as HTMLInputElement
      marcainput.value = produto.marca ?? "";

      const qtdInput = document.getElementById("quantidade") as HTMLInputElement
      qtdInput.value = produto.quantidade.toString()

      const prcInput = document.getElementById("preco") as HTMLInputElement
      prcInput.value = produto.preco.toString()
    }
  }
};



const excluirProduto = (id: number) => {
  let indice = produtosStorage.findIndex(t => t.id === id)
  if (indice === -1) {
    alert("Não possível excluir o produto")
    return
  }

  if (!confirm("Tem certeza que deseja excluir?")) return

  produtosStorage.splice(indice, 1)
  idEmEdicao = null
  atualizarStorage()
  listarProdutos()
};

const salvarProduto = () => {
  const dados = pegarDados();
  const resultado = Produto.criarProduto(dados);
  if (idEmEdicao === null) {

    if (!resultado.sucesso) {
      alert(resultado.erro);
      return;
    }

    produtosStorage.push(resultado.produto!);
    atualizarStorage()
    listarProdutos()
    alert("Produto cadastrado com sucesso");
  } else {
    Produto.validarDados(dados)
    if (resultado.sucesso === false) {
      alert("Não foi possível atualizar o produto. Verifique as informações digitadas e tente novamente.")
      return
    }
    let indice = produtosStorage.findIndex(t => t.id === idEmEdicao)
    produtosStorage[indice] = { ...produtosStorage[indice]!, ...dados };
    idEmEdicao = null
    alert("Produto atualizado com sucesso")
    atualizarStorage()
    listarProdutos()
  }


};

const listarProdutos = () => {
  const container = document.getElementById("container");
  if (!container) return;

  container.innerHTML = "";

  const table = document.createElement("table");
  table.classList.add("table-style");

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  const headers = ["Nome", "Categoria", "Marca", "Quantidade", "Preço"];
  headers.forEach((titulo) => {
    const th = document.createElement("th");
    th.classList.add("header-style");
    th.innerText = titulo;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  for (const produto of produtosStorage) {
    const tr = document.createElement("tr");
    tr.classList.add("row-style");

    // Nome
    const tdNome = document.createElement("td");
    tdNome.classList.add("data-style");
    tdNome.innerText = produto.nome;
    tr.appendChild(tdNome);

    // Categoria
    const tdCategoria = document.createElement("td");
    tdCategoria.classList.add("data-style");
    tdCategoria.innerText = produto.categoria;
    tr.appendChild(tdCategoria);

    // Marca
    const tdMarca = document.createElement("td");
    tdMarca.classList.add("data-style");
    tdMarca.innerText = produto.marca ?? "-";
    tr.appendChild(tdMarca);

    // Quantidade
    const tdQuantidade = document.createElement("td");
    tdQuantidade.classList.add("data-style");
    tdQuantidade.innerText = produto.quantidade.toString();
    tr.appendChild(tdQuantidade);

    // Preço
    const tdPreco = document.createElement("td");
    tdPreco.classList.add("data-style");
    tdPreco.innerText = produto.preco.toString();
    tr.appendChild(tdPreco);

    // Ações (Editar e Excluir)
    const tdAcoes = document.createElement("td");
    tdAcoes.classList.add("data-style");

    const btnEditar = document.createElement("button");
    btnEditar.innerText = "Editar";
    btnEditar.classList.add("btn-editar");
    btnEditar.addEventListener("click", () => {
      editarProduto(produto.id); // Passa o id do produto
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.innerText = "Excluir";
    btnExcluir.classList.add("btn-excluir");
    btnExcluir.addEventListener("click", () => {
      excluirProduto(produto.id); // Passa o id do produto
    });

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);
    tr.appendChild(tdAcoes);

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  container.appendChild(table);
};

const iniciarApp = () => {
  const dadosSalvos = localStorage.getItem("produtosStorage")
  if (dadosSalvos) {
    produtosStorage = JSON.parse(dadosSalvos)
  }
  listarProdutos()
}

iniciarApp()
