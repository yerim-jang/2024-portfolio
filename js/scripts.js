/* Description: Custom JS file */

/* Navigation*/
window.onscroll = function () {
	scrollFunction();//로고 사이즈 변경
	scrollNavFunction();//nav 노출
};

function scrollFunction() {
	if (document.documentElement.scrollTop > 30) {
		document.getElementById("header").classList.add("top-nav-collapse");
	} else if ( document.documentElement.scrollTop < 30 ) {
		document.getElementById("header").classList.remove("top-nav-collapse");
	}

	docHeight = document.documentElement.offsetHeight;

	window.addEventListener('scroll', function(){
		var scrollY = window.scrollY;

		// 현재 스크롤 위치
		if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
			
			// .navbar-logo img의 스케일 조정
			var scaleValue = 1 - (scrollY - 50) / 300;
		
			// 최대 스케일 값을 1로 제한
			scaleValue = Math.min(1, scaleValue);
			scaleValue = Math.max(0.08, scaleValue);

			document.querySelector(".navbar-logo").style.transform = "scale(" + scaleValue + ")";
			document.querySelector(".navbar-logo").style.transition = "0.2s ease";
		} else {
			scaleValue = Math.max(0.08, scaleValue);
		}

	})
}

function scrollNavFunction() { 
		let lastScroll = document.documentElement.scrollTop || 0
		
		document.addEventListener('scroll', function () {
			
			let scrollTop = document.documentElement.scrollTop
			if(scrollTop > lastScroll) {
				// down
				document.querySelector(".navbar-nav").classList.remove('open');
				document.querySelector(".navbar").style.background = 'transparent';

			} else if (document.documentElement.scrollTop < 10) { 
				document.querySelector(".navbar-nav").classList.remove('open');
				document.querySelector(".navbar").style.background = 'transparent';

			} else {
				//up
				document.querySelector(".navbar-nav").classList.add('open');
				document.querySelector(".navbar").style.background = '#e9e9e9';
			}
			lastScroll = scrollTop
		})
}


// // Hover on desktop
// function toggleDropdown(e) {
// 	const _d = e.target.closest(".dropdown");
// 	let _m = document.querySelector(".dropdown-menu", _d);

// 	setTimeout(
// 		function () {
// 		const shouldOpen = _d.matches(":hover");
// 		_m.classList.toggle("show", shouldOpen);
// 		_d.classList.toggle("show", shouldOpen);

// 		_d.setAttribute("aria-expanded", shouldOpen);
// 		},
// 		e.type === "mouseleave" ? 300 : 0
// 	);
// }


/* Rotating Text - Word Cycle */
var checkReplace = document.querySelector('.replace-me');
if (checkReplace !== null) { 
	var replace = new ReplaceMe(document.querySelector('.replace-me'), {
		animation: 'animated fadeIn',                       // Animation class or classes
		speed: 2000,                                        // Delay between each phrase in miliseconds
		separator: ',',                                     // Phrases separator
		hoverStop: false,                                   // Stop rotator on phrase hover
		clickChange: false,                                 // Change phrase on click
		loopCount: 'infinite',                              // Loop Count - 'infinite' or number
		autoRun: true,                                      // Run rotator automatically
		onInit: false,                                      // Function
		onChange: false,                                    // Function
		onComplete: false                                   // Function
	});
}


/* Back To Top Button */
// Get the button
const backToTop = document.querySelector("#myBtn");

const checkScroll = () => {

	// 페이지가 수직으로 얼마나 스크롤되었는지를 확인하는 값(픽셀 단위로 변환) pageOffset
	let pageOffset = window.pageYOffset;
	// 이 값이 0이 아니면, 클래스를 show를 선언하고, 그렇지 않다면 show를 삭제한다. 디폴트 css는 hidden상태
	// 0이면 스크롤이 안된상태 이고, 0이 아니면 스크롤이 일어난상태 
	if(pageYOffset > 800 ){
			backToTop.style.opacity = '1';  
	}else{
			backToTop.style.opacity = '0';  
	}
}

const moveBackToTop=()=>{
    if(window.pageYOffset > 0 ){
        //스무스하게 스크롤 하기 //어디까지 올라갈지 위치를 정한다. behavior 자연스럽게 이동.
        window.scrollTo({top:0, behavior:"smooth"});
    }
}

// 스크롤할때마다, checkScroll을 호출해라.
window.addEventListener('scroll', checkScroll);
// 클릭하면 oveBackToTop를 호출해라
backToTop.addEventListener('click',moveBackToTop);