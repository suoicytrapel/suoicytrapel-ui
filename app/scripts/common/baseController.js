/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the <body> tag
 */

app.controller('baseController', function($scope, $rootScope, $route, baseFactory, $timeout, $location, HomeFactory, $compile, ContactFactory, usSpinnerService, $routeParams, ModalService, $mdDialog, $mdSidenav) {

	var vm = this;

	//Application level variables
	$rootScope.showCover = true;
	$rootScope.currentPage = 'homePage';
	$rootScope.breadCrumbLinks = {};

	/*
	 *Initializing all the variables
	 *
	 * */
	vm.init = function() {

		vm.selectedCategory = null;
		vm.selectedCity = null;
		vm.categoryMap = baseFactory.categoryMap;

		//vm.coverUrl = baseFactory.getCoverUrl();
		vm.contactForm = {};
		/* Parameters for hiding the Loader Screen */

		vm.citiesPopulated = false;
		vm.routeChangeSuccessInvoked = false;
		vm.pageDataPopulated = false;

		/* city and category fields untouched parameters */
		//vm.cityUntouched = true;
		//vm.categoryUntouched = true;

		/*Statically defining the classes for icons present in category dropdown*/
		vm.categoryIconsMap = baseFactory.categoryIconsMap;
		$scope.form = {};

	};

	/*
	 *
	 *Defining the Listeners
	 *
	 * */
	vm.defineListeners = function() {

		/*
		 * called when the view in ng-view
		 * has started loading
		 *
		 * */
		$rootScope.$on("$routeChangeStart", function() {
			vm.showFooter = false;
			vm.startLoader();

		});

		/*
		 * called when the view in ng-view
		 * is successfully loaded
		 *
		 * */
		$rootScope.$on("$routeChangeSuccess", function() {

			vm.showFooter = true;
			vm.routeChangeSuccessInvoked = true;
			if ($location.path() == '/faq/' || $location.path() == '/aboutus/' || $location.path() == '/bad-request/' || $location.path() == '/disclaimer/' || $location.path() == '/privacy-policy/' || $location.path() == '/terms-of-use/')
				vm.pageDataPopulated = true;
			else if ($location.path() == '/')
				applyAutocomplete();
			if ((vm.citiesPopulated && vm.routeChangeSuccessInvoked && vm.pageDataPopulated) || $location.path() == '/bad-request/')
				vm.stopLoader();	
			$timeout(function(){
				$scope.$broadcast('viewLoadedSuccessfully');
			},100);
		});

		
		/*
		 * Apply bg color
		 * change for header
		 * on window scroll
		 *
		 * */
		$(window).on('scroll', function() {
			animateHeaderBgColor();
		});

		/*

		 *
		 * To call autoResizeCover on window resize
		 */
		window.onresize = autoResizeCover;

		/*
		 * is invoked
		 * when the basic data like
		 * city, category etc has to be updated
		 *
		 * */
		$scope.$on('updateBaseControllerData', function(event, args) {
			setCityOnRouteParams(args.routeParamsCity);
			setCategoryOnRouteParams(args.routeParamsCategory);
		});

		$scope.$on('pageDataPopulated', function() {
			vm.pageDataPopulated = true;
			if (vm.citiesPopulated && vm.routeChangeSuccessInvoked && vm.pageDataPopulated)
				vm.stopLoader();
		});
		
		/*
		 * called when the page unloads
		 * is used to scroll up the page as soon as the user hits refresh
		 *
		 * */
		$(window).on('unload', function() {
			$(window).scrollTop(0);
		});

	};

	/*
	 *
	 * Defining the Miscellaneous Methods
	 *
	 * */

	vm.defineMethods = function() {
		
		/*
		 
		 * Method for checking city and vendor is selected before autocomplete
		 * */
		vm.vendorAutocompleteClkHandler = function(){
			if (!vm.selectedCity) {
				angular.element('#vendor-autocomplete-input-id').blur();
				$timeout(function() {
					angular.element('.location-button').triggerHandler('click');
				}, 0);
			} else if (!vm.selectedCategory) {
				angular.element('#vendor-autocomplete-input-id').blur();
				$timeout(function() {
					angular.element('.vendor-type-dropdown').triggerHandler('click');
				}, 0);
			} 
		};
		/*
		 *
		 *Method for showing the loader screen
		 *
		 * */
		vm.startLoader = function() {
			usSpinnerService.spin('home-page-spinner');
			vm.showLoaderScreen = true;
		};

		/*
		 *
		 * Method for hiding the loader screen
		 *
		 * */
		vm.stopLoader = function() {
			//Applying timeout so that the
			//loader screen and spinner is hided
			//in the next digest cycle
			$timeout(function() {
				vm.showLoaderScreen = false;
				usSpinnerService.stop('home-page-spinner');
				vm.routeChangeSuccessInvoked = false;
				vm.pageDataPopulated = false;
			});
		};

		/*
		 *
		 * Called when the search button
		 * is clicked from the cover section
		 *
		 * */
		vm.vendorSearchClickHandlr = function() {

			if (!vm.selectedCity) {
				$timeout(function() {
					angular.element('.location-button').triggerHandler('click');
				}, 0);
			} else if (!vm.selectedCategory) {
				$timeout(function() {
					angular.element('.vendor-type-dropdown').triggerHandler('click');
				}, 0);
			} else {
				if (!vm.searchText) {
					$location.path('/vendors/' + baseFactory.getSelectedCity() + '/' + vm.selectedCategory);
				} else {
					$location.path('/vendors/' + baseFactory.getSelectedCity() + '/' + vm.selectedCategory + '/' + vm.searchText);
				}
			}

		};

		/*
		 *
		 * Called when the user chooses
		 * different option from city dropdown
		 *
		 * */
		vm.setCity = function() {
			baseFactory.setSelectedCity(vm.selectedCity);
			if ($location.path().toString().match(/\/vendors\//i) != null) {
				
					$location.path('/vendors/' + baseFactory.getSelectedCity() + '/' + vm.selectedCategory);
				
			}
			/* Code for emitting data on city change
			 *  so as to change recently added block */
			$scope.$broadcast('cityChangedEvent');
		};

		/*
		 *
		 * Called when the user chooses
		 * different option from category dropdown
		 *
		 * */
		vm.setCategory = function() {
			//var selectedCategoryValue = angular.element($event.currentTarget)[0].getAttribute('data-key');
			baseFactory.setSelectedCategory(vm.selectedCategory);
			//vm.selectedCategory = selectedCategoryValue;
			//vm.toggleCategoryDropdown();
			angular.element('.home-search-box').val('');
			vm.searchText = '';
			if ($location.path().toString().match(/\/vendors\//i) != null) {
				
					$location.path('/vendors/' + baseFactory.getSelectedCity() + '/' + vm.selectedCategory);
				
			}
		};

		/*
		 *
		 * city dialog Angular Material
		 *
		 * */
		vm.openCityDialog = function($event) {
			var parentEl = angular.element(document.body);
			//
			//angular.element(document.body).addClass('height100');
			$mdDialog.show({
				parent : parentEl,
				targetEvent : $event,
				openFrom : 'left',
				closeTo : 'top',
				templateUrl : 'views/selectcitydialog/selectcitydialog.html',
				scope : $scope, //Use parent scope in template
				preserveScope : true,
				//controller: 'baseController',
				clickOutsideToClose : true,
			});

		};

		//Method to hide mdDialog select city Dialog
		vm.closeDialog = function() {
			$mdDialog.hide();
			//angular.element(document.body).removeClass('height100');
			/* Insert the value in baseFactory so that it can be used throughout
			 * the application */
			baseFactory.setSelectedCity(vm.selectedCity);
		};
		/*
		 *
		 * toggle city dropdown
		 *
		 * */
		vm.toggleDropdown = function() {
			vm.cityUntouched = false;
			$('.lp-city-dropdown').slideToggle();
			//$('.venue_includes').toggleClass('slide-down');
		};

		/*
		 *
		 * toggle category dropdown
		 *
		 * */
		vm.toggleCategoryDropdown = function() {
			vm.categoryUntouched = false;
			$('.lp-category-dropdown').slideToggle();
			$('.venue_includes').toggleClass('slide-down');
		};

		/*
		 *
		 * Called when user clicks
		 * contactus from footer
		 *
		 * */
		vm.openContactForm = function() {
			$("#captcha").html("");
			var template = '<simple-captcha valid="captchaValid"></simple-captcha>';
			var captchaTemplate = angular.element(template);
			//Now compile the template with scope $scope
			$compile(captchaTemplate)($scope);
			angular.element('#captcha').append(captchaTemplate);
			$('#contactModal').modal('toggle');
		};

		vm.closeContactForm = function() {
			vm.submitted = false;
			$('#contactModal').modal('toggle');
		};

		/*
		 *
		 * Called when user clicks
		 * submit button from contactus form
		 *
		 * */
		vm.submitEnquiry = function() {
			$('#contactModal').modal('toggle');
			$.toaster({
				priority : 'success',
				title : 'Sending',
				message : 'Sending Email',
				settings : {
					'timeout' : 2000,
				}
			});
			ContactFactory.submitEnquiry.submit(vm.contactForm).$promise.then(function(data) {

				vm.contactForm = {};
				$scope.form.contactForm.$setPristine();
				$scope.form.contactForm.$setUntouched();
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
				$scope.form.contactForm.$setPristine();
				vm.contactForm = {};
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

		/* Methods for defining global side Navigation */
		vm.toggleLeft = buildToggler('left');
		vm.toggleRight = buildToggler('right');
		function buildToggler(componentId) {
			return function() {
				$mdSidenav(componentId).toggle();
			};
		}

	};

	/*
	 *
	 * invoking initial Methods on pageLoad
	 *
	 * */
	vm.invokeInitialMethods = function() {
		vm.startLoader();
		populateCities();
		applyAutocomplete();
		autoResizeCover();
	};

	/*
	 * Method for clearing searched data
	 * */
	/*vm.clearSearchedText = function() {
		angular.element('.home-search-box').val('');
		vm.searchData = '';
		//$scope.$apply();
		return false;
	};*/

	/*
	 *
	 * Call for populating cities
	 *
	 * */
	function populateCities() {
		HomeFactory.loadCities.populateCities().$promise.then(function(data) {
			vm.citiesList = data.toJSON();
			//vm.selectedCity = null;
			//Code for Default Selected City Commented
			//Now the choose city placeholder is to be kept
			/*
			 var counter = 0;
			 if (vm.citiesList && vm.citiesList != null) {
			 angular.forEach(vm.citiesList, function(value, key) {
			 if (counter == 0) {
			 vm.selectedCity = value;
			 baseFactory.setSelectedCity(key);
			 }
			 counter = counter + 1;

			 });
			 }*/

			vm.citiesPopulated = true;
			if (vm.routeChangeSuccessInvoked && vm.citiesPopulated && vm.pageDataPopulated)
				vm.stopLoader();

		}, function(error) {
			$location.path('/bad-request/');

		});
	}


	vm.showSignInPopup = function() {

		ModalService.showModal({
			templateUrl : "views/login/signin.html",
			controller : "loginController",
			controllerAs : "vm",
		}).then(function(modal) {
			/* Opening a modal via javascript */
			modal.element.modal();
			/* returning a promise on closing a modal */
			modal.close.then(function(result) {
				console.log(result);
			});
			/* when closing modal on clicking outside modal area
			 * the modal element should be removed form DOM */
			modal.element.on('hidden.bs.modal', function() {
				modal.controller.closePopup();
			});
		});
	};
	/*
	 *
	 * Call for header bg color animation
	 *
	 * */
	function animateHeaderBgColor() {
		var pageYoffset = window.pageYOffset, coverPage = document.getElementById("coverPage");
		if ( typeof pageYoffset != null && typeof pageYoffset != "undefined" && typeof coverPage != null && typeof coverPage != "undefined")
			$("#navbar").css("background-color", "rgba(238 ,62 ,32 , " + pageYoffset / coverPage.clientHeight + ")");

		if ( typeof pageYoffset != null && typeof pageYoffset != "undefined")
			angular.element('#back-to-top').removeClass().addClass('show-' + Math.floor(pageYoffset / 200));

	}

	/*
	 *
	 * Call for setting city based on route params
	 *
	 * */
	function setCityOnRouteParams(cityId) {
		vm.selectedCity = cityId;

	}

	/*
	 *
	 * Call for setting city based on route params
	 *
	 * */
	function setCategoryOnRouteParams(category) {
		if (vm.categoryMap && typeof vm.categoryMap == 'object') {
			for (var key in vm.categoryMap) {
				if (category == key) {
					vm.selectedCategory = key;
					break;
				}
			}
		}

	}

	/*
	 *
	 * Method for preloading images
	 *
	 * */
	function preloadImages() {
		var images = new Array();

		for ( i = 0; i < preloadImages.arguments.length; i++) {
			images[i] = new Image();
			images[i].src = preloadImages.arguments[i];
		}

	}

	/*
	 * To set the height of cover Page
	 * as per the window height
	 *
	 * */
	function autoResizeCover() {
		$timeout(function() {
			$("#coverPage").height(window.innerHeight);
		}, 0);
	}

	/* callback function for md-autocomplete
	 * returns promise and data */
	vm.querySearch = function(searchText) {
		if (searchText.length > 0 && baseFactory.getSelectedCategory() && baseFactory.getSelectedCity()) {
			var searchRequestDTO = {
				searchType : baseFactory.getSelectedCategory(),
				searchString : searchText,
				cityId : baseFactory.getSelectedCity(),
			};
			var promise = HomeFactory.loadList.populate(searchRequestDTO).$promise;

			return promise.then(function(data) {
				return data;
			}, function(error) {
				$location.path('/bad-request/');
			});

		}
	};

	/*
	 *
	 * Call for Applying autocomplete
	 * All the functions that are to be executed
	 * after page load is written in $timeout
	 *
	 * */
	function applyAutocomplete() {
		//Apply autocomplete when content is loaded on the page
		//$timeout is used so that autocomplete is binded in the next digest cycle
		$timeout(function() {
			/*angular.element('.home-search-box').autocomplete({
				source : function(request, response) {
					if (request.term.length > 0) {
						var searchRequestDTO = {
							searchType : baseFactory.getSelectedCategory(),
							searchString : request.term,
							cityId : baseFactory.getSelectedCity(),
						};
						HomeFactory.loadList.populate(searchRequestDTO).$promise.then(function(data) {
							if (data.length == 0)
								response(['No Results Found']);
							else
								response(data);
						}, function(error) {
							$location.path('/bad-request/');
						});
					}

				},
				select : function(event, ui) {
					//stateid = (ui.item.lable);
					console.log(ui.item.label);
					if (ui.item.label == 'No Results Found') {
						angular.element('.home-search-box').val('');
						vm.searchData = '';
						$scope.$apply();
						return false;
					} else
						vm.searchData = (ui.item.label);
				}
			});*/

			

			$('[data-toggle="tooltip"]').tooltip({
				placement : 'top'
			});

			angular.element("#back-to-top").on('click', function() {
				$("html, body").animate({
					scrollTop : 0
				}, "slow");
				return false;
			});
			
			var mySwiper = new Swiper('.cover-swiper-container', {
				speed : 300,
				spaceBetween : 0,
				autoplay : 3000,
				effect : "fade",
				fade : {
					crossFade : false,
				},
				/*
				 pagination: '.cover-swiper-pagination',
				 paginationType: 'bullets',
				 paginationClickable: true,*/

			});

			//Apply Background color change function on scroll
			animateHeaderBgColor();

			//Hiding loader screen when view has loaded completely
			window.scrollTo(0, 0);

			vm.mainCoverHeading = baseFactory.getMainCoverHeading();

		}, 1000);
	};

	/* Methods Invoked in Correct Sequence */
	vm.init();
	vm.defineListeners();
	vm.defineMethods();
	vm.invokeInitialMethods();
	/* Invoking method for preloading Images */
	preloadImages('/images/about_us_cover.jpg', '/images/faq_cover.jpg');

});
