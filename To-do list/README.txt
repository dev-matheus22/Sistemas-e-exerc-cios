To-Do List com Autenticação Firebase

Um aplicativo web simples de gerenciamento de tarefas, com cadastro e login de usuários usando Firebase Authentication e armazenamento de tarefas no front-end (temporário, em memória).

O projeto permite criar, editar e remover tarefas, além de gerenciar usuários com e-mail e senha.

Funcionalidades
Autenticação de Usuários

Cadastro:

Valida e-mail (precisa conter @).

Valida senha (mínimo 8 caracteres).

Confirmação de senha.

Cria usuário no Firebase Authentication.

Login:

Valida campos obrigatórios.

Autentica usuário usando Firebase Authentication.

Redireciona para a página principal após login bem-sucedido.

Gerenciamento de Tarefas

Adicionar tarefas:

Preenchimento de texto da tarefa.

Registro da data de criação.

Editar tarefas existentes.

Remover tarefas.

Listagem de tarefas:

Mostra texto e data formatada (DD/MM/AAAA).

Botões de edição e exclusão para cada tarefa.

Estrutura do Projeto

index.html: Página principal com a lista de tarefas e o formulário de adição/edição.

cadastro.html: Página de registro de novos usuários.

login.html: Página de login de usuários.

index.js: Lógica de gerenciamento de tarefas (CRUD).

cadastro.js: Lógica de registro de usuários no Firebase.

login.js: Lógica de autenticação de usuários.

firebaseConfig.js: Configuração do Firebase (importado nos scripts).

style.css: Estilização de botões, formulários e lista de tarefas.

Estrutura das Tarefas

Cada tarefa é representada por um objeto:

{
  id: Number,        // ID único gerado incrementalmente
  texto: String,     // Texto da tarefa
  date: Date         // Data de criação
}

Fluxo de Uso

Cadastro

Preencha e-mail, senha e confirmação de senha.

Clique em registrar.

Usuário criado com sucesso → redirecionado para login.

Login

Preencha e-mail e senha.

Clique em entrar.

Usuário autenticado → redirecionado para página principal de tarefas.

Gerenciamento de Tarefas

Adicione novas tarefas pelo input principal.

Edite tarefas existentes clicando no botão “Editar tarefa”.

Remova tarefas clicando no botão “Excluir tarefa”.

A lista é atualizada dinamicamente.

Considerações

O gerenciamento de tarefas é feito apenas na memória (não persistido em banco), então ao atualizar a página as tarefas são perdidas.

A autenticação é segura e gerenciada pelo Firebase Authentication.

Projeto modularizado em três scripts principais: index.js, cadastro.js e login.js.