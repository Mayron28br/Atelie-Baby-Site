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

let listProduct = [];

iconCart.addEventListener('mouseenter', () => {
    section.classList.toggle('show-carrinho')
});

closeCart.addEventListener('click', () => {
    section.classList.toggle('show-carrinho')
});


const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProduct.length > 0){
        listProduct.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = `
            <div class="card-produto-img"><a href="bolsa.html"><img src="${produtos.imagem}"></a></div>
                <div class="card-produto-info">
                  <a href="bolsa.html" class="card-produto-text-title">${produtos.name} </a>
                  <p class="card-produto-text-body">Product of Lux</p>
                </div>
                <div class="card-produto-footer">
                <span class="card-produto-text-title">${produtos.price}</span>
                <div class="card-produto-button">
                  <svg class="svg-icon" viewBox="0 0 20 20"><i class="fa-solid fa-cart-shopping"></i></svg>
                </div>
                </div>
        `;
        })
    }
}
// Selecione todos os elementos com a classe 'card-produto-button'
let buttons = document.querySelectorAll('.card-produto-button');

// Adicione um evento de clique a cada botão
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        let product_id = event.target.closest('.item').dataset.id;
        alert(product_id);
    });
});


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