/*Animações cartões*/

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    rootMargin: '100px', // Área de ativação
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/*FIM cartao animações*/

/*Animação texto*/

const observador = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('mostrar');
        } else {
            entry.target.classList.remove('mostrar');
        }
    });
}, {
    rootMargin: '150px', // Área de ativação
});

const elementosEscondido = document.querySelectorAll('.escondido');
elementosEscondido.forEach((el) => observador.observe(el));

/*Fim Animação texto*/

/*Animação Imagem*/
const entrada = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('aparecer');
        }
    });
}, {
    rootMargin: '-50px', // Área de ativação
});

const imagemEscondida = document.querySelectorAll('.ocultar');
imagemEscondida.forEach((el) => entrada.observe(el));

/*FIM Animação Imagem*/