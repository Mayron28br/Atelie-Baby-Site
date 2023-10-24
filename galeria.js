window.addEventListener("load", function () {
  const marquees = document.querySelectorAll(".marquee");
  const wrapper = document.querySelector(".wrapper");

  function toggleScrollAxis() {
    if (window.innerWidth < 600) {
      wrapper.classList.add("wrapper--vertical");
      [...marquees].forEach((marquee) => marquee.classList.add("marquee--vertical"));
    } else {
      wrapper.classList.remove("wrapper--vertical");
      [...marquees].forEach((marquee) => marquee.classList.remove("marquee--vertical"));
    }
  }

  // Chama a função para aplicar os estilos no carregamento da página e quando a janela é redimensionada
  toggleScrollAxis();
  window.addEventListener("resize", toggleScrollAxis);
});