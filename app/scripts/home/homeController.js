app.controller('HomeController', function(HomeFactory, $rootScope, $scope, baseFactory, $location, HomeService, ContactFactory) {
	var vm = this;
	vm.init = function() {
		$rootScope.showCover = true;
		showcasePortfolio();
	};
	
	function showcasePortfolio(){
		var mySwiper = new Swiper ('.swiper-container', {
			initialSlide: 3,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 22,
            stretch: 0,
            depth: 110,
            modifier: 1,
            slideShadows : true
        },
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        preloadImages: false,
        lazyLoading: true,
        spaceBetween: 20,
    });   

}

    vm.init();
}); 