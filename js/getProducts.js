const apiURL = 'https://backendvenus.onrender.com';

function fetchProdutos(callback) {
    fetch(`${apiURL}/api/products`)
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
        const imageBlob = new Blob([new Uint8Array(produto.image.data)], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(imageBlob);

        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        
        swiperSlide.innerHTML = `
            <div class="item-slide" data-id="${produto._id}">
                <img src="${imageUrl}" alt="${produto.name}" class="img-produto">
                <h3>${produto.name}</h3>
                <p>R$${produto.value} <span>R$${produto.oldValue}</span></p>
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