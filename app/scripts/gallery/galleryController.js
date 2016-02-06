app.controller('galleryController', function(HomeFactory, $rootScope, $scope, $timeout, baseFactory, $location, HomeService, $q) {
	var vm = this;
	vm.init = function(){
		vm.show = false;
		vm.galleryTop = null;
		vm.galleryThumbs = null;
		vm.imagesURL = [
			"http://lorempixel.com/1200/1200/nature/1",
			"http://lorempixel.com/1200/1200/nature/2",
			"http://lorempixel.com/1200/1200/nature/3",
			"http://lorempixel.com/1200/1200/nature/4",
			"http://lorempixel.com/1200/1200/nature/5",
		];
		
		
		
		
	};
	
	$scope.$on('showGallery',function(){
		vm.applySwipe();
		vm.show = true;
	});
	
	vm.defineListeners = function(){
		vm.closeGallery = function(){
			vm.show = false;
			vm.galleryTop.slideTo(0);
			vm.galleryThumbs.slideTo(0);
		};
		
		
		vm.applySwipe = function() {
			vm.galleryTop = new Swiper('.gallery-top', {
				nextButton : '.swiper-button-next',
				prevButton : '.swiper-button-prev',
				spaceBetween : 10,
			});
			vm.galleryThumbs = new Swiper('.gallery-thumbs', {
				spaceBetween : 15,
				centeredSlides : true,
				slidesPerView : 'auto',
				touchRatio : 0.2,
				slideToClickedSlide : true
			});
			vm.galleryTop.params.control = vm.galleryThumbs;
			vm.galleryThumbs.params.control = vm.galleryTop;

		}; 

	};
	
	
	vm.init();
	vm.defineListeners();
});