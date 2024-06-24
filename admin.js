document.addEventListener('DOMContentLoaded', function() {
    // Função para limpar o formulário
    function limparForm(){
        var form = document.getElementById('formadm');
        form.reset(); // Reseta todos os campos do formulário
    }

    // Função para salvar dados no Local Storage
    function salvarDados(dadosEnvio) {
        const listaEnvios = JSON.parse(localStorage.getItem('listaEnvios')) || [];
        listaEnvios.push(dadosEnvio); // Adiciona os novos dados à lista existente
        localStorage.setItem('listaEnvios', JSON.stringify(listaEnvios)); // Salva a lista atualizada no Local Storage
    }

    function excluirTudo() {
        // Limpa a lista na página
        const lista = document.getElementById('listaEnvios');
        lista.innerHTML = '';
      
        // Remove todos os dados do Local Storage
        localStorage.removeItem('listaEnvios');
      
        // Atualiza a lista e o botão após a exclusão
        atualizarLista();
      }
      
    // Função para atualizar a lista de envios na página
    function atualizarLista() {
        const lista = document.getElementById('listaEnvios');
        lista.innerHTML = ''; // Limpa a lista antes de atualizar
    
        const listaEnvios = JSON.parse(localStorage.getItem('listaEnvios')) || [];
        listaEnvios.forEach(function(dadosEnvio, index) {
            const itemLista = document.createElement('li');
            itemLista.innerHTML = `${dadosEnvio.data} - ${dadosEnvio.email}: ${dadosEnvio.nomeUsuario} 
            <button class="delete-bt" data-index="${index}">
            <span class="material-symbols-outlined">close</span>
            </button>`;
            lista.appendChild(itemLista); // Adiciona o item à lista na página
        });

        const deleteButtons = document.querySelectorAll('.delete-bt');
        deleteButtons.forEach(button => {
          button.addEventListener('click', excluirItem);
        });
      
        // Esconde o botão "Excluir Todos" se a lista estiver vazia
        const excluirTudoButton = document.getElementById('excluirTudo');
        if (listaEnvios.length === 0) {
          excluirTudoButton.style.display = 'none';
        } 
        else {
          excluirTudoButton.style.display = 'block';
        }

        // Chama a função de pesquisa após atualizar a lista
        pesquisa();
      }      

    function excluirItem(event) {
        const index = event.target.getAttribute('data-index');
        let listaEnvios = JSON.parse(localStorage.getItem('listaEnvios')) || [];
        listaEnvios.splice(index, 1); // Remove o item da lista pelo índice
        localStorage.setItem('listaEnvios', JSON.stringify(listaEnvios)); // Atualiza o Local Storage
        atualizarLista(); // Atualiza a lista na página
    }

    function pesquisa() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.toLowerCase();
        const listItems = document.querySelectorAll('#listaEnvios li');
      
        listItems.forEach(listItem => {
          const email = listItem.textContent.toLowerCase().includes('email:') ? listItem.textContent.toLowerCase().split(':')[1].trim() : '';
          const nomeUsuario = listItem.textContent.toLowerCase().includes('nomeUsuario:') ? listItem.textContent.toLowerCase().split(':')[1].trim() : '';
      
          if (email.includes(searchTerm) || nomeUsuario.includes(searchTerm)) { 
            listItem.style.display = 'block'; // Exibe o item se corresponder a pesquisa
          } 
          else {
            listItem.style.display = 'none'; // Oculta o item se não corresponder a pesquisa
          }
        });
      }
      

    const form = document.getElementById('formadm');

    // Evento de submissão do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Pega os dados do formulário
        const email = document.getElementById('iemail').value;
        const nomeUsuario = document.getElementById('isenha').value;

        const dadosEnvio = {
            data: new Date().toLocaleString(), // Formata a data e hora atuais
            email: email,
            nomeUsuario: nomeUsuario
        };

        salvarDados(dadosEnvio); 
        atualizarLista(); 
        limparForm(); 
    });

    document.getElementById('limpar').addEventListener('click', limparForm);

    window.addEventListener('load', atualizarLista);

    const excluirTudoButton = document.getElementById('excluirTudo');
    excluirTudoButton.addEventListener('click', excluirTudo);

    document.getElementById('searchInput').addEventListener('input', handleSearch);
});
