import Swiper from 'swiper/bundle'

const hamburguer = document.querySelector('.hamburguer')

hamburguer.onclick = function () {
  const navBar = document.querySelector('.navbar')
  navBar.classList.toggle('active')
  hamburguer.classList.toggle('open')
}

const swiper_destinos = new Swiper('.slide_container', {
  slidesPerView: 4,
  spaceBetween: 20,
  slidesPerGroup: 1,
  loop: true,
  centerSlide: 'true',
  grabCursor: 'true',
  fade: 'true',
  pagination: {
    el: '.swiper-pagination-destinos',
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: '.swiper-button-next-destinos',
    prevEl: '.swiper-button-prev-destinos'
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    520: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    1000: {
      slidesPerView: 4
    }
  }
})

const swiper_proximo = new Swiper('.proximo_slider__container', {
  slidesPerView: 2,
  spaceBetween: 20,
  slidesPerGroup: 1,
  loop: true,
  centerSlide: 'true',
  grabCursor: 'true',
  fade: 'true',
  pagination: {
    el: '.swiper-pagination-proximo',
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: '.swiper-button-next-proximo',
    prevEl: '.swiper-button-prev-proximo'
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    520: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1000: {
      slidesPerView: 2
    }
  }
})

const swiper_planes = new Swiper('.planes_slider__container', {
  slidesPerView: 2,
  spaceBetween: 20,
  slidesPerGroup: 1,
  loop: true,
  centerSlide: 'true',
  grabCursor: 'true',
  fade: 'true',
  navigation: {
    nextEl: '.swiper-button-next-planes',
    prevEl: '.swiper-button-prev-planes'
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    520: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    1000: {
      slidesPerView: 3
    }
  }
})

const swiper_testimonial = new Swiper('.testimonial_slider__container', {
  slidesPerView: 3,
  spaceBetween: 20,
  slidesPerGroup: 1,
  loop: true,
  centerSlide: 'true',
  grabCursor: 'true',
  fade: 'true',
  pagination: {
    el: '.swiper-pagination-testimonial',
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: '.swiper-button-next-testimonial',
    prevEl: '.swiper-button-prev-testimonial'
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    520: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1000: {
      slidesPerView: 3
    }
  }
})
