/* Carrinho */

let iconCartHTML = document.querySelector('.carrinho');
let closeCart = document.querySelector('.carrinho-botao-fechar');
let section = document.querySelector('section');
let listProductHTML = document.querySelector('.Produtos-container.show');
let listCartHTML = document.querySelector('.carrinho-lista');
let iconCartSpan = document.querySelector('.numero-itens-carrinho');

let selectedTypes = [];
let listProduct = [];
let carts = [];

/* Mostrar e fechar Carrinho popup */
iconCartHTML.addEventListener('mouseenter', () => {
    section.classList.toggle('show-carrinho');
});

closeCart.addEventListener('click', () => {
    section.classList.toggle('show-carrinho');
});

/* Adicionar Card Produto */
const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProduct.length > 0) {
        listProduct.forEach(product => {
            if(selectedTypes.length === 0 || selectedTypes.includes(product.type.toLowerCase())){
            let newProduct = document.createElement('div');
            newProduct.classList.add('card-produto');
            newProduct.classList.add(product.type.toLowerCase());
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <div class="card-produto-img"><a href="${product.link}"><img src="${product.imagem}"></a></div>
                <div class="card-produto-info">
                    <a href="${product.link}" class="card-produto-text-title">${product.name}</a>
                    <p class="card-produto-text-body">${product.descriçao}</p>
                </div>
                <div class="card-produto-footer">
                    <span class="card-produto-text-title">R$ ${product.price}</span>
                    <div class="card-produto-button">
                        <svg class="svg-icon" viewBox="0 0 20 20"><i class="fa-solid fa-cart-shopping"></i></svg>
                    </div>
                </div>
            `;
            listProductHTML.appendChild(newProduct);
            }
        });
    }
};

// Suponha que seus checkboxes tenham IDs como 'acessorio', 'bolsa', 'kit'
const typeCheckboxes = document.querySelectorAll('input[type="checkbox"][name="type"]');

typeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        selectedTypes = Array.from(typeCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        addDataToHTML();
    });
});


listProductHTML.addEventListener('click', (event) => {
    let positonClick = event.target;
    if (positonClick.classList.contains('card-produto-button') || positonClick.classList.contains('fa-cart-shopping')) {
        let product_id = positonClick.closest('.card-produto').dataset.id;
        addToCart(product_id);
    }
});

/* Produtos no Carrinho */
const addToCart = (product_id) => {
    let positonThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else if (positonThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[positonThisProductInCart].quantity = carts[positonThisProductInCart].quantity + 1;
    }
    addCartHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
};

const addCartHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('items');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProduct.findIndex((value) => value.id == cart.product_id);
            let info = listProduct[positionProduct];

            newCart.innerHTML = `
                <div class="imagem-item">
                    <img src="${info.imagem}">
                </div>
                <div class="name-item">${info.name}</div>
                <div class="preço-total-item">R$ ${info.price * cart.quantity}</div>
                <div class="quantidade-item">
                    <span class="minus">-</span>
                    <span class="quantity">${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
            listCartHTML.appendChild(newCart);
        });
    }
    iconCartSpan.innerText = totalQuantity;

    // Adicionar eventos para os botões de aumento e diminuição
    let plusButtons = document.querySelectorAll('.plus');
    let minusButtons = document.querySelectorAll('.minus');

    plusButtons.forEach(plusButton => {
        plusButton.addEventListener('click', (event) => {
            let product_id = event.target.parentElement.parentElement.dataset.id;
            changeQuantity(product_id, 'plus');
        });
    });

    minusButtons.forEach(minusButton => {
        minusButton.addEventListener('click', (event) => {
            let product_id = event.target.parentElement.parentElement.dataset.id;
            changeQuantity(product_id, 'minus');
        });
    });
};

const removeCartFromMemory = () => {
    localStorage.removeItem('cart');
};


const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = carts[positionItemInCart];
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;

            case 'minus':
                let changeQuantity = carts[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    carts[positionItemInCart].quantity = changeQuantity;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartHTML();
    
    if (carts.length === 0) {
        // Se o carrinho está vazio, remova os dados da memória
        removeCartFromMemory();
    } else {
        // Caso contrário, atualize os dados da memória
        addCartToMemory();
    }
};

const initapp = () => {
    // get data from json
    fetch('produtos.json')
        .then(response => response.json())
        .then(data => {
            listProduct = data;
            addDataToHTML();

            // get cart from memory
            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartHTML();
            }
        });
};

initapp();

/* FIM carrinho */
