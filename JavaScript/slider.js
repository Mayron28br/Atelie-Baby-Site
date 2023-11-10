let swiperCards = new Swiper('.card-content', {
    loop: true,
    spaceBetween: 32,
    slidesPerView: 'auto',
    centeredSlides: true,
    
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints:{
      600:{
        sliderPerView:2,
      },
      968:{
        sliderPerView:3,
      },
    },
  });

  
