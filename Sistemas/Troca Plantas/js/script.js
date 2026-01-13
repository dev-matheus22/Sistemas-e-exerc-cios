        // Função para realizar a busca (sem recarregar a página)
        function buscarPlanta(event) {
            event.preventDefault(); // Previne o envio do formulário
            const query = document.querySelector('input[type="search"]').value;
            console.log('Buscando por:', query);
            // Você pode colocar aqui a lógica para realizar a busca de fato
        }