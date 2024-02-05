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
  slidesPerView: 2,
  slidesPerGroup: 2,//그룹으로 이동
	spaceBetween: 50,
	breakpoints: {
		// when window is <= 767px
		767: {
			slidesPerView: 1
		},
		// when window is <= 991px
		1200: {
			slidesPerView: 1,
			spaceBetween: 40
		}
	}
});