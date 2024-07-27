const apiURL = 'https://backendvenus.onrender.com';

fetch(`${apiURL}/produtos`)
  .then(response => response.json())
  .then(data => {
    // Aqui você processa os dados recebidos da API
    console.log(data); // Exemplo de como os dados podem ser estruturados
    
    // Chame uma função para inserir os dados na página
    inserirProdutosNaPagina(data);
  })
  .catch(error => console.error('Erro ao buscar dados da API:', error));

  function inserirProdutosNaPagina(produtos) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    
    produtos.forEach(produto => {
      // Cria um elemento swiper-slide para cada produto
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
      
      // Estrutura interna do item-slide (produto)
      swiperSlide.innerHTML = `
        <div class="item-slide" data-id="${produto.id}">
          <img src="${apiURL}/uploads/${produto.imagem}" alt="${produto.nome}" class="img-produto">
          <h3>${produto.nome}</h3>
          <p>R$${produto.valor} <span>R$${produto.valorAntigo}</span></p>
          <button class="add-to-cart-btn">
            <img src="Assets/carrinhoBranco.png">
            <span>Comprar</span>
          </button>
        </div>
      `;
      
      // Adiciona o swiper-slide ao swiper-wrapper
      swiperWrapper.appendChild(swiperSlide);
    });
  }
  