Sistema de Notas

Um sistema web simples para cadastrar alunos, gerenciar matérias e calcular médias e status dos alunos.

O projeto utiliza LocalStorage para persistência de dados e uma interface limpa para exibir alunos e suas informações.

Funcionalidades Atuais

Cadastro de alunos com nome.

Visualização da lista de alunos cadastrados.

Botão para “Gerenciar matérias” (preparado para adicionar matérias, mas ainda em desenvolvimento).

Ordenação da lista de alunos por média (em construção, pois média ainda não está calculada).

Persistência dos alunos no LocalStorage, mantendo dados mesmo após recarregar a página.

Estrutura do Projeto

index.html: Formulário de cadastro de alunos e lista para exibição.

script.js: Lógica de cadastro de alunos, armazenamento no LocalStorage e listagem.

Estilos: CSS incluído inline no HTML, com cores e layout simples para fácil leitura.

Estrutura dos Dados

Cada aluno é representado por um objeto:

{
  id: Number,           // ID único gerado com Date.now()
  nome: String,         // Nome do aluno
  materias: Array       // Array de matérias (em desenvolvimento)
}


Cada matéria, quando implementada, terá a seguinte estrutura:

{
  id: Number,
  nomeMateria: String,
  notas: Array,
  media: Number,
  status: String       // "Aprovado", "Recuperação", "Reprovado" ou "Sem notas"
}

Como Usar

Abra index.html em um navegador.

Preencha o nome do aluno e clique em Adicionar aluno.

Clique em Ordenar por média para organizar a lista (funcionalidade parcial).

Clique em Gerenciar matérias para selecionar o aluno e futuramente adicionar notas e matérias.

Observações

Projeto em desenvolvimento:

Inserção de notas por matéria ainda não implementada.

Cálculo automático da média e status ainda incompleto.

Dados persistem localmente no navegador via LocalStorage.

Layout responsivo básico, ideal para uso em desktop.