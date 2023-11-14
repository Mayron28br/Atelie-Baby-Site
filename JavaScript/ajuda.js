/*carrinho*/

let listCartHTML = document.querySelector('.carrinho-lista');
let iconCartSpan = document.querySelector('.numero-itens-carrinho');
let iconCartHTML = document.querySelector('.carrinho');
let closeCart = document.querySelector('.carrinho-botao-fechar');
let section = document.querySelector('section');

var carts = []
var listProduct = [];

/* Mostrar e fechar Carrinho popup */
iconCartHTML.addEventListener('mouseenter', () => {
    section.classList.toggle('show-carrinho');
});

closeCart.addEventListener('click', () => {
    section.classList.toggle('show-carrinho');
});

const addCartHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    console.log(carts)
    
    if (Array.isArray(carts) && carts.length > 0) {
        console.log(carts)

        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('items');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProduct.findIndex((value) => value.id == cart.product_id);
            let info = listProduct[positionProduct];

            if(info){
            newCart.innerHTML = `
                <div class="imagem-item">
                    <img src="${info.image}">
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
            }
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

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
};

const getCartsFromMemory = () => {
    const local = localStorage.getItem('cart');
    const parse = JSON.parse(local);
    
    if (parse) {
        carts = parse;
    }
};

getCartsFromMemory();

const initapp = () => {

    // get data from json
    fetch('produtos.json')
    .then(response => response.json())
    .then(data => {

        listProduct = data;
        
        const local = localStorage.getItem('cart')
        const parse = JSON.parse(local);

        if(carts.length === 0) {
            carts = parse
        } else {
            carts.concat(parse)
        }
        // get cart from memory
        if (local) {
            addCartHTML();
        }
    });
};

initapp();

/*FIM Carrinho*/