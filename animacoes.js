/*Animações cartões*/

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    rootMargin: '200px', // Área de ativação
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
    rootMargin: '100px', // Área de ativação
});

const elementosEscondido = document.querySelectorAll('.escondido');
elementosEscondido.forEach((el) => observador.observe(el));


/*Fim Animação texto*/