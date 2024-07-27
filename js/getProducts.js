const apiURL = 'https://backendvenus.onrender.com';

function fetchProdutos(callback) {
    fetch(`${apiURL}/produtos`)
        .then(response => response.json())
        .then(data => {
            inserirProdutosNaPagina(data);
            if (callback) callback(); 
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
}

function inserirProdutosNaPagina(produtos) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    
    produtos.forEach(produto => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        
        swiperSlide.innerHTML = `
            <div class="item-slide" data-id="${produto._id}">
                <img src="${apiURL}/uploads/${produto.imagem}" alt="${produto.nome}" class="img-produto">
                <h3>${produto.nome}</h3>
                <p>R$${produto.valor} <span>R$${produto.valorAntigo}</span></p>
                <button class="add-to-cart-btn">
                    <img src="Assets/carrinhoBranco.png">
                    <span>Comprar</span>
                </button>
            </div>
        `;
        
        swiperWrapper.appendChild(swiperSlide);
    });
}

window.fetchProdutos = fetchProdutos;