const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    rootMargin: '300px', // Área de ativação
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/* Carrinho */

let iconCart = document.querySelector('.carrinho');
let closeCart = document.querySelector('.carrinho-botao-fechar');
let section = document.querySelector('section');
let listProductHTML = document.querySelector('.Produtos-container');
let listCartHTML = document.querySelector('.carrinho-lista');
let iconCartSpan = document.querySelector('.numero-itens-carrinho')

let listProduct = [];
let carts = [];

/*Mostrar e fechar Carrinho popup*/
iconCart.addEventListener('mouseenter', () => {
    section.classList.toggle('show-carrinho')
});

closeCart.addEventListener('click', () => {
    section.classList.toggle('show-carrinho')
});
/* FIM Mostrar e fechar Carrinho popup*/

/*Adicionar Card Produto*/
const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProduct.length > 0){
        listProduct.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('card-produto',);
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <div class="card-produto-img"><img src="${product.imagem}"></div>
            <div class="card-produto-info">
              <a href="bolsa.html" class="card-produto-text-title">${product.name}</a>
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
        })
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positonClick = event.target;
    if (positonClick.classList.contains('card-produto-button') || positonClick.classList.contains('fa-cart-shopping')) {
        let product_id = positonClick.closest('.card-produto').dataset.id;
        addToCart(product_id);
    }
})
/*Fim Adicionar Card Produto*/

/*Produtos no Carrinho */
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
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartHTML = () => {
    let totalQuantity = 0;
    listCartHTML.innerHTML = '';
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('items');
            let positionProduct = listProduct.findIndex((value) => value.id == cart.product_id);
            let info = listProduct[positionProduct];

            newCart.innerHTML = `
            <div class="imagem-item">
                <img src="${info.imagem}">
            </div>
            <div class="name-item">${info.name}</div>
            <div class="preço-total-item">R$ ${info.price * cart.quantity}</div>
            <div class="quantidade-item">
                <span class="menos-item"><</span>
                <span>${cart.quantity}</span>
                <span class="mais-item">></span>
            </div>
            `
            listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

/*FIM produtos no Carrinho*/

const initapp = () => {
    //get data from json
    fetch('produtos.json')
    .then(response => response.json())
    .then(data => {
        listProduct = data;
        addDataToHTML();
    })
        // get cart from memory
        if (localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartHTML();
        }
}

initapp();

/*FIM carrinho*/
