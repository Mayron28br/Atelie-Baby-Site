const displayCartProducts = () => {
    // Verifique se há algo armazenado no localStorage
    if (localStorage.getItem('cart')) {
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        const carrinhoListaProdutos = document.querySelector('.carrinho-lista-produtos');

        carrinhoListaProdutos.innerHTML = ''; // Limpe a lista de produtos antes de preenchê-la novamente

        cartItems.forEach(cartItem => {
            // Encontre as informações do produto com base no ID (você pode fazer isso com listProduct)
            const productInfo = listProduct.find(product => product.id === cartItem.product_id);

            if (productInfo) {
                const productElement = document.createElement('div');
                productElement.classList.add('carrinho-produto');
                productElement.innerHTML = `
                    <img class="imagem-produto" src="${productInfo.imagem}">
                    <p class="nome-produto">${productInfo.name}</p>
                    <p class="preço-produto">R$ ${productInfo.price}</p>
                    <div class="quantidade-produto">
                        <span class="minus">-</span>
                        <span class="quantity">${cartItem.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                carrinhoListaProdutos.appendChild(productElement);
            }
        });
    } else {
        // Se o carrinho estiver vazio, você pode exibir uma mensagem informando isso.
        document.querySelector('.carrinho-lista-produtos').innerHTML = 'Seu carrinho está vazio.';
    }
};
