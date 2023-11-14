const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
progress = document.querySelector(".slider-price-input .progress");

let priceGap = 100;

priceInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(priceInput[0].value),
        maxVal = parseInt(priceInput[1].value);

        if((maxVal - minVal >= priceGap) && maxVal <= 1500){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            }else{
                rangeInput[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        }

    });
});

rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if(maxVal - minVal < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap;
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }

    });
});

// Suponha que você tenha uma lista de itens como esta
const listaDeItens = [
    { nome: 'Item 1', preco: 500 },
    { nome: 'Item 2', preco: 1000 },
    { nome: 'Item 3', preco: 1500 },
    // ... mais itens
];

function filtrarItensPorPreco(min, max) {
    // Use a função filter para obter apenas os itens dentro do intervalo de preços
    const itensFiltrados = listaDeItens.filter(item => item.preco >= min && item.preco <= max);

    // Agora você pode fazer algo com os itens filtrados, como exibi-los na página
    console.log(itensFiltrados);
}

// Chame esta função quando os valores de preço forem alterados
function atualizarFiltroDePreco() {
    const minVal = parseInt(rangeInput[0].value);
    const maxVal = parseInt(rangeInput[1].value);

    // Chame a função de filtragem com os valores atuais do intervalo de preços
    filtrarItensPorPreco(minVal, maxVal);
}

// Adicione este trecho ao seu código para chamar a função quando os valores de preço mudarem
rangeInput.forEach(input => {
    input.addEventListener("input", atualizarFiltroDePreco);
});
