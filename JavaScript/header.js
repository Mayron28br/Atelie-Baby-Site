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
// JavaScript
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.add("active");
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.remove("active");
}

window.onclick = function (event) {
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
        var modal = modals[i];
        if (event.target == modal) {
            modal.classList.remove("active");
        }
    }
}
// Função para abrir o modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.add("active");
    document.querySelector('.menu-icon').classList.add('menu-open');
}

// Função para fechar o modal
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.remove("active");
    document.querySelector('.menu-icon').classList.remove('menu-open');
}

window.onclick = function (event) {
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
        var modal = modals[i];
        if (event.target == modal) {
            modal.classList.remove("active");
            document.querySelector('.menu-icon').classList.remove('menu-open');
        }
    }
};


