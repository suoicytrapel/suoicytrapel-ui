app.controller('detailController', function($scope, $rootScope, $interval, baseFactory, $timeout, $location, HomeFactory, dataService, DataFactory, Constants, $routeParams, $window, details) {
	var vm = this;
	vm.tabName = [];
	vm.tabData = [];
	vm.latitude = null;
	vm.longitude = null;

	vm.init = function() {
		$rootScope.showCover = false;
		vm.selectedCategory = $routeParams.category;
		vm.name = $routeParams.searchParam;
		vm.city = $routeParams.city;
		vm.category = $routeParams.category;

		/* gallery Variables */
		vm.show = false;
		vm.galleryTop = null;
		vm.galleryThumbs = null;

	};
	vm.defineListeners = function() {
		vm.openGallery = function() {
			$window.ga('send', 'event', 'View Gallery', 'File Name');
			vm.applySwipe();
			vm.show = true;
		};

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
				onSlideChangeStart : onSlideChangeCallback,
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

		vm.changeSlide = function(index) {
			vm.galleryTop.slideTo(index);
		};

		function onSlideChangeCallback() {
			var activeSlideIndex = vm.galleryTop.activeIndex;
			angular.element('.gallery-helptext-container li:nth-child(' + (activeSlideIndex + 1) + ')').addClass('active').siblings().removeClass('active');
		}

	};
	vm.fetchDetails = function() {
		if (details && !(details.error)) {
			vm.detailedData = details;

			vm.latitude = vm.detailedData.latitude;
			vm.longitude = vm.detailedData.longitude;
			angular.forEach(vm.detailedData.tabMap, function(value, key) {
				vm.tabName.push(key);
				vm.tabData.push(value);
			});
			if (vm.detailedData && vm.detailedData.attachments && vm.detailedData.attachments.length > 0)
				vm.coverbgImageURL = baseFactory.getWebURL() + vm.detailedData.attachments[0].imageURL;
			dataService.setImageURLs(vm.detailedData.attachments);



			vm.imagesURL = vm.getImageUrlInArray(dataService.getImageURLs());
			vm.helpTexts = vm.getHelpText(dataService.getImageURLs());
			//Applying Boxer on the menu images
			vm.loadBoxer = function() {
				$('.boxer').boxer({
					fixed : true,
				});
			};
			//google.maps.event.addDomListener(window, 'load', loadMap(28.012496, 73.336364));
			checkForMaps();
		} else {
			console.log(details.error);
		}

	};

	vm.getImageUrlInArray = function(imageURLs) {
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

	function checkForMaps() {
		var interval = setInterval(function() {
			if ( typeof google === 'object' && typeof google.maps === 'object') {
				loadMap();
				clearInterval(interval);
			}
		}, 100);
	}

	function loadMap() {
		var myCenter = new google.maps.LatLng(vm.latitude, vm.longitude);
		var mapProp = {
			center : myCenter,
			zoom : 16,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(angular.element('#map')[0], mapProp);

		var marker = new google.maps.Marker({
			position : myCenter,
		});

		marker.setMap(map);
	};

		vm.getImageURL = function(imagePath) {
				return baseFactory.getWebURL() + imagePath;
			};
// 	
	

	vm.getReccomendationDetails = function(name) {
		$window.ga('send', 'event', 'View Recommended Item', name, vm.category);
		//vm.name = name;
		$location.path('/details/' + vm.city + '/' + vm.category + '/' + name);
	};

	vm.initializeData = function() {
		vm.tabName = [];
		vm.tabData = [];
		vm.latitude = null;
		vm.longitude = null;
	};

	vm.emitPageDataPopulated = function() {

		$scope.$emit('pageDataPopulated');
	};

	vm.init();
	vm.fetchDetails();
	vm.defineListeners();
	vm.emitPageDataPopulated();
});
