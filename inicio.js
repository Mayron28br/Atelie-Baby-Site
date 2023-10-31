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
// Função para abrir o modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
}

// Função para fechar o modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

/* Carrinho */

let iconCart = document.querySelector('.carrinho');
let closeCart = document.querySelector('.carrinho-botao-fechar');
let section = document.querySelector('section');
let listProductHTML = document.querySelector('.carrinho-lista');
let listCartHTML = document.querySelector('.carrinho-lista');
let iconCartSpan = document.querySelector('.numero-itens-carrinho')

let listProduct = [];
let carts = [];

iconCart.addEventListener('mouseenter', () => {
    section.classList.toggle('show-carrinho')
});

closeCart.addEventListener('click', () => {
    section.classList.toggle('show-carrinho')
});


// Selecione todos os elementos com a classe 'card-produto-button'
let buttons = document.querySelectorAll('.card-produto-button');

// Adicione um evento de clique a cada botão
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        let product_id = event.target.closest('.item').dataset.id;
        addToCart(product_id);
    });
});

const addToCart = (product_id) => {
    let.positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    } else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    if (carts.length > 0){
        carts.forEach(carts => {
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.innerHTML = `
            <div class="imagem-item">
            <img src="Place Holder.jpg">
            </div>
            <div class="name-item">nome</div>
            <div class="preço-total-item">R$ 200</div>
            <div class="quantidade-item">
            <span class="menos-item"><</span>
            <span>${cart.quantity}</span>
            <span class="mais-item">></span>
            </div>
            `;
        listCartHTML.appendChild(newCart)
        })
    }
}

const initapp = () => {
    //get data from json
    fetch('produtos.json')
    .then(response => response.json())
    .then(data => {
        listProduct = data;
        addDataToHTML();
    })
}

initapp();

/*FIM carrinho*/