/* Card Slider - Swiper */
var cardSlider = new Swiper('.card-slider', {
	// autoplay: {
	// 	delay: 4000,
	// 	disableOnInteraction: false
	// },
	loop: false,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
  slidesPerView: 2.3,
  freeMode:true,
  // slidesPerGroup: 2,//그룹으로 이동
	spaceBetween: 40,
	breakpoints: {
		// when window is <= 767px
		767: {
			slidesPerView: 1.3
		},
		// when window is <= 991px
		1200: {
			slidesPerView: 1.3,
			spaceBetween: 40
		}
	}
});