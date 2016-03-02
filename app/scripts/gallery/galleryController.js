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
	$scope.$on('loadGallery', function(event, args) {
		vm.imagesURL = vm.getImageURL(dataService.getImageURLs());
		vm.helpTexts = vm.getHelpText(dataService.getImageURLs());
		vm.name = args.name;
		vm.state = args.state;
		vm.city = args.city;
		vm.category = sessionStorage.selectedCategory;
	});

	vm.getImageURL = function(imageURLs) {
		var images = [];
		for (var k in imageURLs) {
			images.push(baseFactory.getWebURL() + imageURLs[k].imageURL);
		}
		return images;
	};
	
	vm.getHelpText = function(imageURLs) {
		var helpTexts = [];
		for (var k in imageURLs) {
			helpTexts.push(imageURLs[k].helpText);
		}
		return helpTexts;
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
				onSlideChangeStart: onSlideChangeCallback,
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
		
		vm.changeSlide = function(index){
			vm.galleryTop.slideTo(index);
		};
		
		function onSlideChangeCallback(){
			var activeSlideIndex = vm.galleryTop.activeIndex;
			angular.element('.gallery-helptext-container li:nth-child(' + (activeSlideIndex+1) + ')').addClass('active').siblings().removeClass('active');
		}

	};

	vm.init();
	vm.defineListeners();
});
