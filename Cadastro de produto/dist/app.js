var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var produtosStorage = [];
var categoriasFixas = ["Alimentício", "Higiene", "Jardinagem", "Eletrônico"];
var idEmEdicao = null;
var atualizarStorage = function () {
    localStorage.setItem("produtosStorage", JSON.stringify(produtosStorage));
};
var pegarDados = function () {
    var nome = document.getElementById("nome");
    var categoria = document.getElementById("categoria");
    var marca = document.getElementById("marca");
    var quantidade = document.getElementById("quantidade");
    var preco = document.getElementById("preco");
    var nomeProduto = nome.value.trim();
    var categoriaProduto = categoria.value.trim();
    var marcaProduto = marca.value.trim();
    var quantidadeProduto = Number(quantidade.value);
    var precoProduto = Number(preco.value);
    var objSimples = {
        nome: nomeProduto,
        categoria: categoriaProduto,
        marca: marcaProduto,
        quantidade: quantidadeProduto,
        preco: precoProduto,
    };
    return objSimples;
};
var Produto = /** @class */ (function () {
    function Produto() {
    }
    Produto.validarDados = function (dados) {
        var _a;
        var objErro = {
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
        if (((_a = dados.marca) === null || _a === void 0 ? void 0 : _a.trim()) === "") {
            dados.marca = undefined;
        }
        return { sucesso: true, dados: dados };
    };
    Produto.criarProduto = function (dados) {
        var _a, _b, _c, _d, _e;
        var resultado = Produto.validarDados(dados);
        if (resultado.sucesso === false) {
            return { sucesso: false, erro: "Nome não pode estar vazio" };
        }
        else {
            var objDefinido = {
                id: Date.now(),
                nome: (_a = resultado.dados) === null || _a === void 0 ? void 0 : _a.nome,
                categoria: (_b = resultado.dados) === null || _b === void 0 ? void 0 : _b.categoria,
                marca: (_c = resultado.dados) === null || _c === void 0 ? void 0 : _c.marca,
                quantidade: (_d = resultado.dados) === null || _d === void 0 ? void 0 : _d.quantidade,
                preco: (_e = resultado.dados) === null || _e === void 0 ? void 0 : _e.preco,
            };
            return { sucesso: true, produto: objDefinido };
        }
    };
    return Produto;
}());
var erroValidacao = function () { };
var editarProduto = function (id) {
    var _a;
    for (var _i = 0, produtosStorage_1 = produtosStorage; _i < produtosStorage_1.length; _i++) {
        var produto = produtosStorage_1[_i];
        if (produto.id === id) {
            idEmEdicao = id;
            var nomeInput = document.getElementById("nome");
            nomeInput.value = produto.nome;
            var categoriaInput = document.getElementById("categoria");
            categoriaInput.value = produto.categoria;
            var marcainput = document.getElementById("marca");
            marcainput.value = (_a = produto.marca) !== null && _a !== void 0 ? _a : "";
            var qtdInput = document.getElementById("quantidade");
            qtdInput.value = produto.quantidade.toString();
            var prcInput = document.getElementById("preco");
            prcInput.value = produto.preco.toString();
        }
    }
};
var excluirProduto = function (id) {
    var indice = produtosStorage.findIndex(function (t) { return t.id === id; });
    if (indice === -1) {
        alert("Não possível excluir o produto");
        return;
    }
    if (!confirm("Tem certeza que deseja excluir?"))
        return;
    produtosStorage.splice(indice, 1);
    idEmEdicao = null;
    atualizarStorage();
    listarProdutos();
};
var salvarProduto = function () {
    var dados = pegarDados();
    var resultado = Produto.criarProduto(dados);
    if (idEmEdicao === null) {
        if (!resultado.sucesso) {
            alert(resultado.erro);
            return;
        }
        produtosStorage.push(resultado.produto);
        atualizarStorage();
        listarProdutos();
        alert("Produto cadastrado com sucesso");
    }
    else {
        Produto.validarDados(dados);
        if (resultado.sucesso === false) {
            alert("Não foi possível atualizar o produto. Verifique as informações digitadas e tente novamente.");
            return;
        }
        var indice = produtosStorage.findIndex(function (t) { return t.id === idEmEdicao; });
        produtosStorage[indice] = __assign(__assign({}, produtosStorage[indice]), dados);
        idEmEdicao = null;
        alert("Produto atualizado com sucesso");
        atualizarStorage();
        listarProdutos();
    }
};
var listarProdutos = function () {
    var _a;
    var container = document.getElementById("container");
    if (!container)
        return;
    container.innerHTML = "";
    var table = document.createElement("table");
    table.classList.add("table-style");
    var thead = document.createElement("thead");
    var trHead = document.createElement("tr");
    var headers = ["Nome", "Categoria", "Marca", "Quantidade", "Preço"];
    headers.forEach(function (titulo) {
        var th = document.createElement("th");
        th.classList.add("header-style");
        th.innerText = titulo;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);
    var tbody = document.createElement("tbody");
    var _loop_1 = function (produto) {
        var tr = document.createElement("tr");
        tr.classList.add("row-style");
        // Nome
        var tdNome = document.createElement("td");
        tdNome.classList.add("data-style");
        tdNome.innerText = produto.nome;
        tr.appendChild(tdNome);
        // Categoria
        var tdCategoria = document.createElement("td");
        tdCategoria.classList.add("data-style");
        tdCategoria.innerText = produto.categoria;
        tr.appendChild(tdCategoria);
        // Marca
        var tdMarca = document.createElement("td");
        tdMarca.classList.add("data-style");
        tdMarca.innerText = (_a = produto.marca) !== null && _a !== void 0 ? _a : "-";
        tr.appendChild(tdMarca);
        // Quantidade
        var tdQuantidade = document.createElement("td");
        tdQuantidade.classList.add("data-style");
        tdQuantidade.innerText = produto.quantidade.toString();
        tr.appendChild(tdQuantidade);
        // Preço
        var tdPreco = document.createElement("td");
        tdPreco.classList.add("data-style");
        tdPreco.innerText = produto.preco.toString();
        tr.appendChild(tdPreco);
        // Ações (Editar e Excluir)
        var tdAcoes = document.createElement("td");
        tdAcoes.classList.add("data-style");
        var btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";
        btnEditar.classList.add("btn-editar");
        btnEditar.addEventListener("click", function () {
            editarProduto(produto.id); // Passa o id do produto
        });
        var btnExcluir = document.createElement("button");
        btnExcluir.innerText = "Excluir";
        btnExcluir.classList.add("btn-excluir");
        btnExcluir.addEventListener("click", function () {
            excluirProduto(produto.id); // Passa o id do produto
        });
        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);
        tr.appendChild(tdAcoes);
        tbody.appendChild(tr);
    };
    for (var _i = 0, produtosStorage_2 = produtosStorage; _i < produtosStorage_2.length; _i++) {
        var produto = produtosStorage_2[_i];
        _loop_1(produto);
    }
    table.appendChild(tbody);
    container.appendChild(table);
};
var iniciarApp = function () {
    var dadosSalvos = localStorage.getItem("produtosStorage");
    if (dadosSalvos) {
        produtosStorage = JSON.parse(dadosSalvos);
    }
    listarProdutos();
};
iniciarApp();
