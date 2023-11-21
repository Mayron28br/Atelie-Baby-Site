const button = document.querySelector(".parcelamento");
const modal = document.querySelector(".parcelamento-popup");
const buttonclose = document.querySelector(".fechar-popup");

button.onclick = function () {
    modal.showModal();
}
buttonclose.onclick = function () {
    modal.close();
};

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
    var duration = 1000; // Aumentamos a duração para 1000ms para uma animação mais suave
    var interval = 10; // Intervalo de atualização

    var scrollStep = -window.scrollY / (duration / interval);

    var scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, interval);
}

// Quando o botão é clicado, chame a função subirbotao
document.getElementById("botaotopo").addEventListener("click", function() {
    subirbotao();
});

/*FIM Botao Topo*/

/*Imagem seleção*/
const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        highlightSelectedImage();
        slideImage();
    });
});

nextButton.addEventListener('click', () => {
    imgId = (imgId % 4) + 1; // Vai para a próxima imagem
    highlightSelectedImage();
    slideImage();
});

prevButton.addEventListener('click', () => {
    imgId = (imgId - 2 + 4) % 4 + 1; // Volta para a imagem anterior
    highlightSelectedImage();
    slideImage();
});

function highlightSelectedImage() {
    imgBtns.forEach((imgItem) => {
        imgItem.parentNode.classList.remove('selected');
    });
    imgBtns[imgId - 1].parentNode.classList.add('selected'); 
}

function slideImage() {
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);

// Destaque a imagem selecionada inicialmente
highlightSelectedImage();

/*Imagem seleção*/

/*Personalização*/

const buttonComprar = document.querySelector('.botao-comprar');

buttonComprar.addEventListener('click', () => {
    // Captura as informações selecionadas
    const colorCourano = document.querySelector('.cor-tecido button').innerText;
    const colorFita = document.querySelector('.cor-fita button').innerText;
    const name = document.querySelector('.nome input').value;
    const selectedBordado = document.querySelector('input[name="engine"]:checked')?.value;

    // Cria um objeto com as informações de personalização
    const customizationInfo = {
        colorCourano,
        colorFita,
        name,
        selectedBordado
    };

    // Obtém o ID do produto a partir do botão de compra
    const productId = buttonComprar.dataset.id;

    // Atualiza a propriedade customization no produto correspondente no JSON
    updateCustomizationInJSON(productId, customizationInfo);
});

function updateCustomizationInJSON(productId, customizationInfo) {
    // Obtém os dados do JSON
    fetch('produtos.json')
        .then(response => response.json())
        .then(data => {
            // Encontra o produto correspondente pelo ID
            const product = data.find(product => product.id == productId);

            // Atualiza a propriedade customization no produto
            if (product) {
                product.customization = JSON.stringify(customizationInfo);
                
                // Atualiza os dados no armazenamento local
                localStorage.setItem('produtos', JSON.stringify(data));

                // Adiciona as informações ao carrinho, se necessário
                addToCart(productId);
            }
        });
}

function addToCart(productId) {
    // Lógica para adicionar o produto ao carrinho, se necessário
    // ...
}
