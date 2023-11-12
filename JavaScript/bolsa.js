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