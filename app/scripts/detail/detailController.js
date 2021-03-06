app.controller('detailController', function($scope, $rootScope, $interval, baseFactory, $timeout, $location, HomeFactory, dataService, DataFactory, Constants, $routeParams, $window, details, reviewComments, $compile, ContactFactory, userDetailsStore, detailFactory, appDetailsStore) {
	var vm = this;

	vm.init = function() {
		$rootScope.showCover = false;
		$rootScope.currentPage = 'detailPage';
		$rootScope.breadCrumbLinks = {};
		$rootScope.breadCrumbLinks['Home'] = '/';
		$rootScope.breadCrumbLinks['Vendor type: ' + $routeParams.category] = $rootScope.dataPageBreadCrumbPath ? $rootScope.dataPageBreadCrumbPath : '/vendors/' + appDetailsStore.getAppDetails().selectedCity + '/' + $routeParams.category;
		$rootScope.breadCrumbLinks[$routeParams.searchParam] = $location.path();
		
		
		vm.selectedCategory = $routeParams.category;
		vm.name = $routeParams.searchParam;
		vm.city = $routeParams.city;
		vm.category = $routeParams.category;
		vm.categoryInitials = vm.category.slice(0,1);
		vm.tabName = [];
		vm.tabData = [];
		vm.latitude = null;
		vm.longitude = null;
		vm.isFormValid = true;
		vm.reviewSubmitted = false;
		vm.showValidationErrors = false;
		vm.minDate = new Date();
		vm.availabilityForm = {};
		vm.availabilityForm.bookingDate = new Date();
		vm.newReviewModel = {
			vendorRating: 0,
			reviewMoney: '',
			reviewComment: '',
			submitReview: function(){
				if(!userDetailsStore.getLoggedInUserDetails()){
					$scope.showSignInPopup({type: 'Warning', message: 'Message: Please Login to Post a Review'});
				}
				else{
					if(vm.newReviewModel.vendorRating > 0 && vm.newReviewModel.reviewComment.length > 0){
					vm.showValidationErrors = false;
					/* REST call for submitting the review */
					var token = userDetailsStore.getLoggedInUserDetails().tokenType + ' ' + userDetailsStore.getLoggedInUserDetails().accessToken;
					var saveReviewParams = {
						starRating: vm.newReviewModel.vendorRating,
						reviewComment: vm.newReviewModel.reviewComment,
						reviewMoney: vm.newReviewModel.reviewMoney,
						vendorType : vm.selectedCategory,
						vendorName : vm.name,
						reviewedBy: userDetailsStore.getLoggedInUserDetails().name,
						userImageURL: userDetailsStore.getLoggedInUserDetails().userImage,
					};
                     var promise = detailFactory.review(token).save(saveReviewParams).$promise;

                    return promise.then(function(data) {
                    	vm.reviewSubmitted = true;
                        vm.newReviewModel.vendorRating = 0;
                        vm.newReviewModel.reviewComment = '';
                        vm.newReviewModel.reviewMoney = '';
                        var searchRequestDTO = {
                        	vendorType : vm.selectedCategory,
							vendorName : vm.name,
                        	offset : 1,
                        	limit:50
                        };
                        detailFactory.getReview().getReviewsByVendor(searchRequestDTO).$promise.then(function(data) {
	                        vm.vendorReviewComments = data;

	                     },function(error){
	                     	console.log('Error in getting reviews');
	                     });

                     },function(error){
                     	console.log('Error in submitting review');
                     });
                     }
                     else{
                     	vm.showValidationErrors = true;
                     }
                    }
				
			},
			allowPostingReview: function(e){
				if(!userDetailsStore.getLoggedInUserDetails()){
				$scope.showSignInPopup({type: 'Warning', message: 'Message: Please Login to Post a Review'});
				angular.element(e.currentTarget).blur();
				}
			}
		};
		vm.postedReviewRating = 5;
		vm.vendorAverageRating = 4.6;
		vm.showReviewsPage = false;
		
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
	
	/* Defining listener after view is loaded successfully
	 * This event is broadcasted from baseCOntroller
	 *  */
	$scope.$on('viewLoadedSuccessfully',function(){
			var fixedStartLimit, fixedEndLimit, fixedElemWidth, fixedElemHeight, contentHeight;
			
			/* Subtracting 100 so as to subtract the height of header which is 80 and 20 extra*/
			fixedStartLimit = $('.detail-info-section').offset().top + $('.detail-info-section').height() - 100;
			//fixedEndLimit = fixedStartLimit + $('.details-tabs-content').height();
			fixedElemWidth = $('.details-fixed-component').width();
			fixedElemHeight = $('.details-fixed-component').height();
			/* contentHeight was not calculating accurately */
			//contentHeight = $('.details-tabs-content').height();


		$(window).on('scroll', function() {			
			if(!fixedEndLimit)
				fixedEndLimit = fixedStartLimit + $('.details-tabs-content').height();
			if(!contentHeight)
				contentHeight = $('.details-tabs-content').height();
					
			if ($(window).scrollTop() < fixedStartLimit || $(window).scrollTop() > fixedEndLimit){
				$('.details-fixed-component').removeClass('sticky relative');
				$('.details-fixed-component').css('top','initial');
			}	
			else {
				if($(window).scrollTop() > (fixedEndLimit - fixedElemHeight)){
					$('.details-fixed-component').css('top',(contentHeight - fixedElemHeight -25));
					$('.details-fixed-component').removeClass('sticky').addClass('relative');
				}
				else{
				$('.details-fixed-component').css('top','80px');
				$('.details-fixed-component').removeClass('relative').addClass('sticky');
				}
				$('.details-fixed-component').width(fixedElemWidth);
			}
		});
		
		});
	
	vm.defineListeners = function() {
		
		
		vm.viewAllReviews = function(){
			vm.showReviewsPage = true;	
		};
		
		vm.closeAllReviews = function(){
			vm.showReviewsPage = false;
		};
		
		//opening vendor image gallery
		vm.openGallery = function(index) {
			$window.ga('send', 'event', 'View Gallery', 'File Name');
			vm.applySwipe();
			vm.changeSlide(index);
			$timeout(function() {
				vm.show = true;
			}, 100);
		};
		
		//closing vendor image gallery
		vm.closeGallery = function() {
			vm.show = false;
			vm.galleryTop.slideTo(0);
			vm.galleryThumbs.slideTo(0);
		};
		
		//applying swiper on both galleries that are openened when we open the image gallery
		//both are controlled by each other
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
		
		//mini gallery is the gallery shown on the detail page itself
		//i.e. the gallery which is present before opening the main one
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
		
		//Method for changing the slide of top gallery based on click from thumb gallery		
		vm.changeSlide = function(index) {
			vm.galleryTop.slideTo(index);
		};
		
		//Callback fn after the slide is changed
		function onSlideChangeCallback() {
			var activeSlideIndex = vm.galleryTop.activeIndex;
			angular.element('.gallery-helptext-container li:nth-child(' + (activeSlideIndex + 1) + ')').addClass('active').siblings().removeClass('active');
		}

		//Applying scrollspy on body so that it detects the left_nav_container
		$("body").scrollspy({
			target : "#left_nav_container",
			offset : 300
		});

		//Event handler as soon as the left_nav_container is detected
		$("#left_nav_container").on("activate.bs.scrollspy", function() {});

	};
	
	//Clk Handler for any of the items clicked from left nav container
	vm.leftNavContClkHandler = function(event, tab){
		$('html, body').animate({
				scrollTop : $('#'+ tab).offset().top - 300
			}, 300);
			/* href is important for scrollspy */
			/* so for disabling the page navigation through href below two statements are necessary */
			event.preventDefault();
			return false;
	};
	
	//Fetching the details from the data returned from the REST call written in resolve block of this page
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
			
			//Applying Boxer on the food menu images
			vm.loadBoxer = function() {
				$('.boxer').boxer({
					fixed : true,
				});
			};
			//google.maps.event.addDomListener(window, 'load', loadMap(28.012496, 73.336364));
			
			//checking if the maps API is loaded or not
			checkForMaps();
		} else {
			console.log(details.error);
		}
		
		if(reviewComments){
			vm.vendorReviewComments = reviewComments;
		}
		else{
			console.log('error in fetching review comments for this vendor');
		}

	};

	//Fetching the image URLs in array to be shown on UI
	vm.getImageUrlInArray = function(imageURLs) {
		var images = [];
		for (var k in imageURLs) {
			images.push(baseFactory.getWebURL() + imageURLs[k].imageURL);
		}
		return images;
	};

	//Fetching the help text for each image to be shown in gallery
	vm.getHelpText = function(imageURLs) {
		var helpTexts = [];
		for (var k in imageURLs) {
			helpTexts.push(imageURLs[k].helpText);
		}
		return helpTexts;
	};

	//Checking if the Map object is available or not
	function checkForMaps() {
		var interval = setInterval(function() {
			if ( typeof google === 'object' && typeof google.maps === 'object') {
				loadMap();
				clearInterval(interval);
			}
		}, 100);
	}

	//Loading the map as per the defined coordinates(latitude, longitude) from backend
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

	//Method for fetching teh image URL dynamically
	vm.getImageURL = function(imagePath) {
		return baseFactory.getWebURL() + imagePath;
	};
	
	//Method for fetching and showing the detail of record clicked from recommended section
	vm.getReccomendationDetails = function(name) {
		//Google analytics if the user clicks on any recommended details
		$window.ga('send', 'event', 'View Recommended Item', name, vm.category);
		//vm.name = name;
		$location.path('/details/' + vm.city + '/' + vm.category + '/' + name);
	};

	//Applying swiper on recommeneded section
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
					spaceBetweenSlides : 5
				},
				// when window width is <= 480px
				991 : {
					slidesPerView : 3,
					spaceBetweenSlides : 5
				},
				// when window width is <= 640px
				1199 : {
					slidesPerView : 4,
					spaceBetweenSlides : 10
				},
				1980 : {
					slidesPerView : 5,
					spaceBetweenSlides : 10
				}
			}
		});
	};

	//For populating a new captcha each time a form is loaded/opened
	vm.populateDynamicCaptcha = function() {
		$("#detailsPageCaptcha").html("");
		var template = '<simple-captcha valid="captchaValid"></simple-captcha>';
		var captchaTemplate = angular.element(template);
		//Now compile the template with scope $scope
		$compile(captchaTemplate)($scope);
		angular.element('#detailsPageCaptcha').append(captchaTemplate);
	};

	//CLk Handler for submit button for the form present on details page
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
	
	//Dynamic validations for check availability form
	vm.validateAvailabilityForm = function(){
		if(vm.availabilityForm.email || vm.availabilityForm.phoneNumber){
			return true;
		}
		else{
			vm.isFormValid = false;
			return vm.isFormValid;
		}
	};
	
	//open check availability form
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

	//clk handler for submit button clicked on check availablity form
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
