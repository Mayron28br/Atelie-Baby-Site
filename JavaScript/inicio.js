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

const swiper = new Swiper('.swiper', {
    autoplay: {
    delay: 5000,
    disableOnInteraction: false
    },
    loop: true,
    
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
    },
    
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
    
    });

/*Botao Topo*/

function checkScrollPosition() {
    var botaotopo = document.getElementById("botaotopo");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        botaotopo.classList.add("active");
    } else {
        botaotopo.classList.remove("active");
    }
}

window.onscroll = function() {
    checkScrollPosition();
}

function subirbotao() {
    var duration = 1000;
    var interval = 10;

    var scrollStep = -window.scrollY / (duration / interval);

    var scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, interval);
}
document.getElementById("botaotopo").addEventListener("click", function() {
    subirbotao();
});

/*FIM Botao Topo*/

/*carrinho*/

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


