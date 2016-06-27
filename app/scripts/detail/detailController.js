app.controller('detailController', function($scope, $rootScope, $interval, baseFactory, $timeout, $location, HomeFactory, dataService, DataFactory, Constants, $routeParams, $window, details, $compile, ContactFactory) {
	var vm = this;
	vm.tabName = [];
	vm.tabData = [];
	vm.latitude = null;
	vm.longitude = null;

	vm.init = function() {
		$rootScope.showCover = false;
		$rootScope.breadCrumbLinks = {};
		$rootScope.breadCrumbLinks['Home'] = '/';
		$rootScope.breadCrumbLinks['Vendor type: ' + $routeParams.category] = $rootScope.dataPageBreadCrumbPath ? $rootScope.dataPageBreadCrumbPath : '/vendors/' + baseFactory.getSelectedCity() + '/' + $routeParams.category;
		$rootScope.breadCrumbLinks[$routeParams.searchParam] = $location.path();
		vm.selectedCategory = $routeParams.category;
		vm.name = $routeParams.searchParam;
		vm.city = $routeParams.city;
		vm.category = $routeParams.category;
		vm.categoryInitials = vm.category.slice(0,1);
		vm.isFormValid = true;
		/*vm.menuMap = [{
			type: 'veg',
			price: '400',
			foodMenu: {
				'welcome drinks': 2,
				'soups': 2,
				'salads': 3,
				'veg starters': 2,
				'non-veg starters': '-',
				'veg main course': 2,
				'non-veg main course': '-',
				'raita': 1,
				'dal': 1,
				'rice/biryani': 2,
				'assorted breads': 'Any',
				'deserts': 3				
			}
		},
		{
			type: 'non-veg',
			price: '500',
			foodMenu: {
				'welcome drinks': 2,
				'soups': 2,
				'salads': 3,
				'veg starters': 2,
				'non-veg starters': 2,
				'veg main course': 2,
				'non-veg main course': 2,
				'raita': 1,
				'dal': 1,
				'rice/biryani': 2,
				'assorted breads': 'Any',
				'deserts': 3				
			}
			}];*/

		/* gallery Variables */
		vm.show = false;
		vm.galleryTop = null;
		vm.galleryThumbs = null;
		vm.detailsPageFormsubmitted = false;
		vm.showDetailsFormSpinner = false;

		vm.detailsPageContactForm = {};

		$scope.form = {};

	};
	vm.defineListeners = function() {

		$(window).on('scroll', function() {
			/* Subtracting 100 so as to subtract the height of header which is 80 and 20 extra*/
			/* Subtracting window height/2 so that the below content should not get impacted */
			var fixedStartLimit = $('.detail-info-section').offset().top + $('.detail-info-section').height() - 100;
			var fixedEndLimit = fixedStartLimit + $('.details-tabs-content').height();
			var fixedElemWidth = $('.details-fixed-component').width();

			if ($(window).scrollTop() < fixedStartLimit || $(window).scrollTop() > fixedEndLimit)
				$('.details-fixed-component').removeClass('sticky');
			else {
				$('.details-fixed-component').addClass('sticky');
				$('.details-fixed-component').width(fixedElemWidth);
			}
		});

		vm.openGallery = function(index) {
			$window.ga('send', 'event', 'View Gallery', 'File Name');
			vm.applySwipe();
			vm.changeSlide(index);
			$timeout(function() {
				vm.show = true;
			}, 100);
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

		vm.applySwiperMiniGallery = function() {
			//mySwiper.destroy();
			new Swiper('.details-mini-swiper-container', {
				effect : 'slide',
				speed : 500,
				slidesPerView : '4',
				nextButton : '.details-mini-swiper-button-next',
				prevButton : '.details-mini-swiper-button-prev',
				spaceBetween : 10,
				breakpoints : {
					// when window width is <= 767px
					767 : {
						slidesPerView : 2,
						spaceBetweenSlides : 5
					},
					// when window width is <= 991px
					991 : {
						slidesPerView : 3,
						spaceBetweenSlides : 10
					},
					// when window width is <= 1199px
					1199 : {
						slidesPerView : 3,
						spaceBetweenSlides : 10
					}
				}

			});
			//mySwiper.slideTo(0);
		};

		vm.changeSlide = function(index) {
			vm.galleryTop.slideTo(index);
		};

		function onSlideChangeCallback() {
			var activeSlideIndex = vm.galleryTop.activeIndex;
			angular.element('.gallery-helptext-container li:nth-child(' + (activeSlideIndex + 1) + ')').addClass('active').siblings().removeClass('active');
		}


		$("body").scrollspy({
			target : "#left_nav_container",
			offset : 100
		});

		$("#left_nav_container").on("activate.bs.scrollspy", function() {

		});

		$("#left_nav_container ul li a[href^='#']").on('click', function(e) {

			// prevent default anchor click behavior
			e.preventDefault();

			// store hash
			var hash = this.hash;

			// animate
			$('html, body').animate({
				scrollTop : $(hash).offset().top - 100
			}, 300);

		});
	};
	vm.fetchDetails = function() {
		if (details && !(details.error)) {
			vm.detailedData = details;

			vm.latitude = vm.detailedData.latitude;
			vm.longitude = vm.detailedData.longitude;
			/*angular.forEach(vm.detailedData.serviceAmenityTabMap, function(value, key) {
			 vm.tabName.push(key);
			 vm.tabData.push(value);
			 });*/
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

	vm.applySwiperOnRecommended = function() {
		var mySwiper = new Swiper('.recommended-by-us-swiper-container', {
			effect : 'slide',
			grabCursor : false,
			slidesPerView : '3',
			nextButton : '.recommended-by-us-swiper-button-next',
			prevButton : '.recommended-by-us-swiper-button-prev',
			preloadImages : false,
			lazyLoading : true,
			spaceBetween : 20,
			breakpoints : {
				// when window width is <= 320px
				767 : {
					slidesPerView : 1,
					spaceBetweenSlides : 10
				},
				// when window width is <= 480px
				991 : {
					slidesPerView : 2,
					spaceBetweenSlides : 20
				},
				// when window width is <= 640px
				1199 : {
					slidesPerView : 3,
					spaceBetweenSlides : 20
				}
			}
		});
	};

	vm.populateDynamicCaptcha = function() {
		$("#detailsPageCaptcha").html("");
		var template = '<simple-captcha valid="captchaValid"></simple-captcha>';
		var captchaTemplate = angular.element(template);
		//Now compile the template with scope $scope
		$compile(captchaTemplate)($scope);
		angular.element('#detailsPageCaptcha').append(captchaTemplate);
	};

	vm.detailsPageFormSubmit = function() {

		vm.showDetailsFormSpinner = true;

		ContactFactory.submitEnquiry.submit(vm.detailsPageContactForm).$promise.then(function(data) {
			$scope.form.detailsPageContactForm.$setPristine();
			$scope.form.detailsPageContactForm.$setUntouched();
			vm.detailsPageFormSubmitted = false;
			vm.showDetailsFormSpinner = false;
			vm.populateDynamicCaptcha();
			vm.detailsPageContactForm = {};
			vm.detailsPageFormSubmitted = false;
			$.toaster({
				priority : 'success',
				title : 'Success',
				message : 'Email has been sent',
				settings : {
					'timeout' : 3000,
				}
			});
		}, function(error) {
			vm.detailsPageContactForm = {};
			vm.showDetailsFormSpinner = false;
			console.log(error);
			$.toaster({
				priority : 'warning',
				title : 'Please Try Again',
				message : 'Error Sending Email',
				settings : {
					'timeout' : 3000,
				}
			});
		});

		vm.detailsPageContactForm = {};
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
	vm.populateDynamicCaptcha();
	vm.emitPageDataPopulated();

	vm.validateAvailabilityForm = function(){
		if(vm.availabilityForm.email || vm.availabilityForm.phoneNumber){
			return true;
		}
		else{
			vm.isFormValid = false;
			return vm.isFormValid;
		}
	};

	vm.openAvailabilityForm = function() {
		$("#captcha1").html("");
		var template = '<simple-captcha valid="captchaValid"></simple-captcha>';
		var captchaTemplate = angular.element(template);
		//Now compile the template with scope $scope
		$compile(captchaTemplate)($scope);
		angular.element('#captcha1').append(captchaTemplate);
		$('#checkAvailabilityModal').modal('toggle');
	};

	vm.closeAvailabilityForm = function() {
		vm.submitted = false;
		$scope.form.availabilityForm.$setPristine();
		$scope.form.availabilityForm.$setUntouched();
		$('#checkAvailabilityModal').modal('toggle');
	};

	vm.checkAvailability = function(){
		$('#checkAvailabilityModal').modal('toggle');
		$.toaster({
			priority : 'success',
			title : 'Sending',
			message : 'Sending Email',
			settings : {
				'timeout' : 2000,
			}
		});
		vm.availabilityForm.vendorName = vm.detailedData.name;
		vm.availabilityForm.vendorEmailAddress = vm.detailedData.email;
		vm.availabilityForm.vendorType = vm.category;
		DataFactory.checkAvailability.submit(vm.availabilityForm).$promise.then(function(data) {
			vm.availabilityForm = {};
			$scope.form.availabilityForm.$setPristine();
			$scope.form.availabilityForm.$setUntouched();
			vm.submitted = false;
			//$('#contactModal').modal('toggle');
			$.toaster({
				priority : 'success',
				title : 'Success',
				message : 'Email has been sent',
				settings : {
					'timeout' : 3000,
				}
			});
		}, function(error) {
			vm.availabilityForm = {};
			$scope.form.availabilityForm.$setPristine();
			$scope.form.availabilityForm.$setUntouched();
			//$('#contactModal').modal('toggle');
			console.log(error);
			$.toaster({
				priority : 'warning',
				title : 'Please Try Again',
				message : 'Error Sending Email',
				settings : {
					'timeout' : 3000,
				}
			});
		});

	};

});
