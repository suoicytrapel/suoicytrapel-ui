app.controller('galleryController', function(HomeFactory, $rootScope, $scope, $timeout, baseFactory, $location, HomeService, $q, dataService, Constants) {
	var vm = this;
	vm.init = function() {
		vm.show = false;
		vm.galleryTop = null;
		vm.galleryThumbs = null;
	};
	
	//apply swiper when view gallery button is clicked
	$scope.$on('showGallery', function() {
		vm.applySwipe();
		vm.show = true;
	});
	
	//load images as soon as they are available
	$scope.$on('loadGallery', function() {
		vm.imagesURL = vm.getImageURL(dataService.getImageURLs());
	});

	vm.getImageURL = function(imageURLs) {
		var images = [];
		for (var k in imageURLs) {
			images.push(Constants.WEB_HOST + imageURLs[k]);
		}
		return images;
	};

	vm.defineListeners = function() {
		vm.closeGallery = function() {
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
