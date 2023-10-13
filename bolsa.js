const button = document.querySelector(".parcelamento");
const modal = document.querySelector(".parcelamento-popup");
const buttonclose = document.querySelector(".fechar-popup");

button.onclick = function () {
    modal.showModal();
}
buttonclose.onclick = function () {
    modal.close();
};

document.getElementById('openPopup').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'flex';
  });
  
  document.getElementById('closePopup').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'none';
  });
  