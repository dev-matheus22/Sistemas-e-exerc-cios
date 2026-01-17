Sorteio de Amigo Secreto

Um aplicativo web simples para cadastrar participantes e realizar o sorteio de Amigo Secreto, mostrando quem tirou quem de forma automática.

O sistema é totalmente client-side, sem necessidade de banco de dados, e conta com uma interface intuitiva para cadastro, remoção e sorteio dos participantes.

Funcionalidades

Cadastrar participantes com validação de campo (não aceita nomes vazios).

Remover participantes individualmente.

Sortear Amigo Secreto usando algoritmo de embaralhamento Fisher-Yates (Yates Shuffle), garantindo que cada participante receba outro de forma aleatória.

Exibir resultados de forma organizada e visual.

Resetar lista para iniciar um novo sorteio.

Estrutura do Projeto

index.html: Estrutura do formulário, botões, lista de participantes e container de resultados.

index.js: Lógica de cadastro, remoção, sorteio e exibição dos resultados.

style.css (in-line no HTML): Estilização moderna com cores definidas por variáveis CSS, suporte a hover e diferenciação visual da lista de participantes e do resultado do sorteio.

Estrutura dos Participantes

Cada participante é representado por um objeto:

{
  participante: String,  // Nome do participante
  id: Number             // ID único gerado incrementalmente
}


O resultado do sorteio é armazenado assim:

{
  de: String,    // Quem tirou
  tirou: String  // Quem foi sorteado
}

Algoritmo de Sorteio

A lista de participantes é embaralhada usando o algoritmo Fisher-Yates para garantir aleatoriedade.

Cada participante recebe outro da lista como “amigo secreto”.

O último participante recebe o primeiro da lista, garantindo que todos tenham alguém sorteado.

Como Usar

Abra o arquivo index.html no navegador.

Cadastre os participantes inserindo os nomes no input e clicando em “Cadastrar”.

Clique em Sortear Amigo para gerar os pares aleatórios.

Os resultados aparecerão no container de resultados.

Caso queira reiniciar, clique em Resetar Lista.

Considerações

Aplicativo 100% client-side, não salva dados após recarregar a página.

Estilização responsiva e minimalista, com cores intuitivas para destaque de ações importantes.

Fácil de expandir, por exemplo, adicionando persistência via LocalStorage ou integração com backend