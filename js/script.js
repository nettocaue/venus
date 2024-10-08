function exibirNotificacao(mensagem, tipo) {
    if (tipo === 'success') {
        alert("Sucesso: " + mensagem);
    } else if (tipo === 'error') {
        alert("Erro: " + mensagem);
    } else {
        alert(mensagem);
    }
}

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'hidden') {
        document.title = "🛍️ Volte para suas compras";
    }
    else if (window.location.href.includes("carrinho")) {
        document.title = "Carrinho de compras";
    }
    else {
        document.title = "Venus Cosméticos";
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function showModal() {
        var modal = document.getElementById('modal');
        modal.style.display = 'flex';

        var span = document.getElementsByClassName('close')[0];
        span.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    if (!sessionStorage.getItem('modalShown')) {
        setTimeout(function() {
            showModal();
            sessionStorage.setItem('modalShown', 'true');
        }, 2000);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const formModal = document.getElementById('newsletter-modal');
    const formSection = document.getElementById('newsletter-section');

    const emailInputModal = document.getElementById('email-newsletter-modal');
    const emailInputSection = document.getElementById('email-newsletter-section');

    const emailErrorModal = document.getElementById('email-error-newsletter-modal');
    const emailErrorSection = document.getElementById('email-error-newsletter-section');

    formModal.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!isValidEmail(emailInputModal.value)) {
            emailErrorModal.textContent = 'Por favor, insira um e-mail válido.';
            return;
        }
        
        emailErrorModal.textContent = ''; 
        exibirNotificacao("E-mail cadastrado com sucesso!", 'success');
        modal.style.display = 'none';
    });

    formSection.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!isValidEmail(emailInputSection.value)) {
            emailErrorSection.textContent = 'Por favor, insira um e-mail válido.';
            return;
        }
        
        emailErrorSection.textContent = ''; 
        emailInputSection.value = '';
        exibirNotificacao("E-mail cadastrado com sucesso!", 'success');
        modal.style.display = 'none';
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});



function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "../Assets/menu.png";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "../Assets/close.png";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.fetchProdutos) {
        window.fetchProdutos(() => {
            const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

            addToCartButtons.forEach(function(button) {
                button.addEventListener('click', function(event) {
                    const produtoDiv = event.target.closest('.item-slide');
                    if (!produtoDiv) {
                        console.error('Produto não encontrado');
                        return;
                    }

                    const produtoId = produtoDiv.getAttribute('data-id');
                    const produtoNome = produtoDiv.querySelector('h3').textContent;
                    const imagem = produtoDiv.querySelector('img').src;
                    const produtoPreco = parseFloat(produtoDiv.querySelector('p').textContent.replace('R$', '').replace(',', '.'));

                    adicionarAoCarrinho(produtoId, produtoNome, produtoPreco, imagem);
                });
            });

            function adicionarAoCarrinho(id, nome, preco, imagem) {
                let carrinho = localStorage.getItem('carrinho');
                carrinho = carrinho ? JSON.parse(carrinho) : [];

                const itemExistente = carrinho.find(item => item.id === id);
                if (itemExistente) {
                    itemExistente.quantidade++;
                    itemExistente.preco = itemExistente.preco + preco;
                    exibirNotificacao("Produto adicionado ao carrinho com sucesso!", 'success');
                } else {
                    carrinho.push({ id, nome, preco, quantidade: 1, img: imagem });
                    exibirNotificacao("Produto adicionado ao carrinho com sucesso!", 'success');
                }

                localStorage.setItem('carrinho', JSON.stringify(carrinho));
            }
        });
    } else {
        console.error('Função fetchProdutos não encontrada.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const carrinhoItemsUl = document.getElementById('carrinho-items');
    
    renderizarCarrinho();

    function renderizarCarrinho() {
        carrinhoItemsUl.innerHTML = '';
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        carrinho.forEach(function(item) {
            const li = document.createElement('li');

            const divProduto = document.createElement('div');
            divProduto.classList.add('produto-item');

            const imgProduto = document.createElement('img');
            imgProduto.src = item.img;
            imgProduto.alt = item.nome;
            imgProduto.classList.add('produto-imagem');
            divProduto.appendChild(imgProduto);

            const detalhesProduto = document.createElement('div');
            detalhesProduto.classList.add('produto-detalhes');
            detalhesProduto.innerHTML = `
                <p class="produto-nome">${item.nome}</p>
                <p class="produto-quantidade">Quantidade: ${item.quantidade}</p>
                <p class="produto-preco">Preço: R$ ${item.preco}</p>
            `;
            divProduto.appendChild(detalhesProduto);

            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.classList.add('remover-item-btn');
            btnRemover.addEventListener('click', function() {
                removerDoCarrinho(item.id);
            });
            divProduto.appendChild(btnRemover);

            li.appendChild(divProduto);
            carrinhoItemsUl.appendChild(li);
        });
    }

    function removerDoCarrinho(id) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const index = carrinho.findIndex(item => item.id === id);
        if (index !== -1) {
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderizarCarrinho();
            exibirNotificacao("Produto removido do carrinho com sucesso!", 'success');
        }
    }
});
