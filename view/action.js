const api = 'http://localhost:3001';

const listarButton = document.querySelector('input.listar-produtos');
const cadastrarButton = document.querySelector('form');

const produtosContainer = document.querySelector('section.lista-produtos');


listarButton.addEventListener('click', () => {
    if (produtosContainer.textContent.trim() == "") {
        listarButton.value = 'Esconder produtos';

        fetch(`${api}/products`)
            .then(response => response.json())
            .then(data => {
                produtosContainer.innerHTML = '<h1>Produtos</h1>';
                data.forEach(product => {
                    produtosContainer.innerHTML += (
                        '<div>'
                        + `<span>${product.name} - R$${product.price}</span>`
                        + `<a onclick="editarProduto(${product.id})">[✏️]</a>`
                        + `<a href="deletarProduto(${product.id})">[🗑️]</a>`
                        + '</div>'
                    );
                });
            })
            .catch(error => {
                console.error('Ocorreu um erro:', error);
            });
    } else {
        listarButton.value = 'Listar produtos';
        produtosContainer.innerHTML = '';
    }
});

cadastrarButton.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.querySelector('input#nome-produto').value;
    const price = document.querySelector('input#preco-produto').value;
    const produto = { name, price };

    fetch(`${api}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Produto cadastrado:', data);
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
});