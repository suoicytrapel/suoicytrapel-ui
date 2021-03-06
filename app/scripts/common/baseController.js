/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the <body> tag
 */

app.controller('baseController', function($scope, $rootScope, $route, baseFactory, $timeout, $location, HomeFactory, $compile, ContactFactory, usSpinnerService, $routeParams, ModalService, $mdDialog, $mdSidenav, $window, $element, loginStatusService, progressbarService, userDetailsStore, appDetailsStore) {

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

		vm.selectedCategory = appDetailsStore.getAppDetails().selectedCategory;
		vm.selectedCity = appDetailsStore.getAppDetails().selectedCity;
		vm.categoryMap = baseFactory.categoryMap;

		//vm.coverUrl = baseFactory.getCoverUrl();
		vm.contactForm = {};

		/* Parameters for hiding the Loader Screen */
		vm.citiesPopulated = false;
		vm.routeChangeSuccessInvoked = false;
		vm.pageDataPopulated = false;

		/*Statically defining the classes for icons present in category dropdown*/
		/*vm.categoryIconsMap = baseFactory.categoryIconsMap;*/
		$scope.form = {};

		vm.loggedInUser = false;
		vm.loggedInUsername = null;
		
		vm.showProgressbar = false;

	};

	$scope.logout = function()
    {
        gapi.auth.signOut();
        location.reload();
        FB.logout(function () { document.location.reload(); });
        
        loginStatusService.getSubjectToSubscribe().onNext({isLoggedIn: false});
        //userDetailsStore.setLoggedInUserDetails(null);
        userDetailsStore.removeLoggedInUserDetails();
    };


/*<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1490864197597595',
      xfbml      : true,
      version    : 'v2.6'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>*/

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
			if ($location.path() == '/faq/' || $location.path() == '/aboutus/' || $location.path() == '/bad-request/' || $location.path() == '/disclaimer/' || $location.path() == '/privacy-policy/' || $location.path() == '/terms-of-use/' || $location.path() == '/wizard/')
				vm.pageDataPopulated = true;
			else if ($location.path() == '/')
				baseOperations();
			if ((vm.citiesPopulated && vm.routeChangeSuccessInvoked && vm.pageDataPopulated) || $location.path() == '/bad-request/')
				vm.stopLoader();
			$timeout(function() {
				$scope.$broadcast('viewLoadedSuccessfully');
			}, 100);
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

		/*
		 * is invoked
		 * when the pageDataPopulated event
		 * is emitted by other pages when all the data is populated
		 *
		 * */
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

		//for adding a custom class for md-menu-container for giving some styling

		$scope.$on('$mdMenuOpen', function() {
			$timeout(function() {
				//getting menu content container by tag id from html
				var menuContentContainer = angular.element('#loggedInuser_md_menu_content');
				// Using parent() method to get parent warper with .md-open-menu-container class and adding custom class.
				menuContentContainer.parent().addClass('formatter-class');
			});
		});
		
		/*
			Subscribing for loginStatusService so that the header menu can 
			be changed based on that		 
		 * */
		
		loginStatusService.getSubjectToSubscribe().subscribe(function(result){
			vm.loggedInUser = result.isLoggedIn;
			vm.loggedInUsername = userDetailsStore.getLoggedInUserDetails().name;
			
			/* For hiding wizard option from dropdown incase userRole is 'USER' and not 'VENDOR'  */
			if(userDetailsStore.getLoggedInUserDetails().userRole === 'USER'){
				vm.isVendorLoggedIn = false;
			}
			else if(userDetailsStore.getLoggedInUserDetails().userRole === 'VENDOR'){
				vm.isVendorLoggedIn = true;
			}
			/* For hiding reset password option from dropdown incase user logs in from fb or google */ 
			vm.isAppUser = userDetailsStore.getLoggedInUserDetails().isAppUser;
			
			loginStatusService.setLoginStatus(result.isLoggedIn);
		});
		
		/*
		 	Subscribing for progressbarService to enable disable progressbar
		 * */
		
		progressbarService.getSubjectToSubscribe().subscribe(function(result){
			vm.showProgressbar = result.showProgressbar;
			progressbarService.setProgressbarStatus(result.showProgressbar);
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
		vm.vendorAutocompleteClkHandler = function() {
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
			//usSpinnerService.spin('home-page-spinner');
			//vm.showLoaderScreen = true;
			
			/*progressbarService.getSubjectToSubscribe().onNext({
				showProgressbar: true,
			});*/
			
			progressbarService.enableProgressbar(true);
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
				//vm.showLoaderScreen = false;
				//usSpinnerService.stop('home-page-spinner');
				/*progressbarService.getSubjectToSubscribe().onNext({
				showProgressbar: false,
			});*/
			progressbarService.enableProgressbar(false);
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
					$location.path('/vendors/' + appDetailsStore.getAppDetails().selectedCity + '/' + appDetailsStore.getAppDetails().selectedCategory);
				} else {
					$location.path('/vendors/' + appDetailsStore.getAppDetails().selectedCity + '/' + appDetailsStore.getAppDetails().selectedCategory + '/' + vm.searchText);
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
			//baseFactory.setSelectedCity(vm.selectedCity);
			appDetailsStore.setSelectedCity(vm.selectedCity);
			if ($location.path().toString().match(/\/vendors\//i) != null) {

				$location.path('/vendors/' + appDetailsStore.getAppDetails().selectedCity + '/' + vm.selectedCategory);

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
			//baseFactory.setSelectedCategory(vm.selectedCategory);
			appDetailsStore.setSelectedCategory(vm.selectedCategory);
			//vm.selectedCategory = selectedCategoryValue;
			angular.element('.home-search-box').val('');
			vm.searchText = '';
			if ($location.path().toString().match(/\/vendors\//i) != null) {

				$location.path('/vendors/' + appDetailsStore.getAppDetails().selectedCity + '/' + vm.selectedCategory);

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
			//baseFactory.setSelectedCity(vm.selectedCity);
			appDetailsStore.setSelectedCity(vm.selectedCity);
		};
		/*
		 *
		 * Called when user clicks
		 * contactus button
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
		baseOperations();
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

			vm.citiesPopulated = true;
			if (vm.routeChangeSuccessInvoked && vm.citiesPopulated && vm.pageDataPopulated)
				vm.stopLoader();

		}, function(error) {
			$location.path('/bad-request/');

		});
	}

	/*
	 *
	 * method for showing sign in popup
	 * Binded with $scope so that it can be called from any page
	 *
	 * */
	$scope.showSignInPopup = function(msg) {
		
		ModalService.showModal({
			templateUrl : "/views/login/signin.html",
			controller : "loginController",
			controllerAs : "vm",
		}).then(function(modal) {
			/* Opening a modal via javascript */
			modal.element.modal();
			
			if(msg){
			modal.controller.messageType = msg.type;
			modal.controller.messageBarMessage = msg.message;
			}
			/* returning a promise on closing a modal */
			modal.close.then(function(result) {
				console.log(result);
			});
			/* when closing modal on clicking outside modal area
			 * the modal element should be removed form DOM */
			modal.element.on('hidden.bs.modal', function () {
            modal.controller.closePopup();
        });
		});
	};
	/*
	 *
	 * method for showing sign up popup
	 * Binded with $scope so that it can be called from any page
	 *
	 * */
	$scope.showSignUpPopup = function() {
		//vm.closePopup();
		ModalService.showModal({
			templateUrl : "/views/login/signup.html",
			controller : "signupController",
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


	$scope.showResetPwdPopup = function(msg) {
		ModalService.showModal({
			templateUrl : "/views/login/resetpwd.html",
			controller : "resetpwdController",
			controllerAs : "vm",
		}).then(function(modal) {
			/* Opening a modal via javascript */
			modal.element.modal();
			
			if(msg){
			modal.controller.messageType = msg.type;
			modal.controller.messageBarMessage = msg.message;
			}
			/* returning a promise on closing a modal */
			modal.close.then(function(result) {
				console.log(result);
			});
			/* when closing modal on clicking outside modal area
			 * the modal element should be removed form DOM */
			modal.element.on('hidden.bs.modal', function () {
            modal.controller.closePopup();
        });
		});
	};
	
	$scope.showResetForgotPwdPopup = function(msg) {
		ModalService.showModal({
			templateUrl : "/views/login/resetforgotpwd.html",
			controller : "resetforgotpwdController",
			controllerAs : "vm",
		}).then(function(modal) {
			/* Opening a modal via javascript */
			modal.element.modal();
			
			if(msg){
			modal.controller.messageType = msg.type;
			modal.controller.messageBarMessage = msg.message;
			}
			/* returning a promise on closing a modal */
			modal.close.then(function(result) {
				console.log(result);
			});
			/* when closing modal on clicking outside modal area
			 * the modal element should be removed form DOM */
			modal.element.on('hidden.bs.modal', function () {
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
		var pageYoffset = $window.pageYOffset, coverPage = angular.element("#coverPage")[0];
		if ( typeof pageYoffset != null && typeof pageYoffset != "undefined" && typeof coverPage != null && typeof coverPage != "undefined")
			angular.element("#navbar").css("background-color", "rgba(238 ,62 ,32 , " + pageYoffset / coverPage.clientHeight + ")");

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
			angular.element("#coverPage").height($window.innerHeight);
		}, 0);
	}

	/* callback function for md-autocomplete
	 * returns promise and data */
	vm.querySearch = function(searchText) {
		if (searchText.length > 0 && appDetailsStore.getAppDetails().selectedCategory && appDetailsStore.getAppDetails().selectedCity) {
			var searchRequestDTO = {
				searchType : appDetailsStore.getAppDetails().selectedCategory,
				searchString : searchText,
				cityId : appDetailsStore.getAppDetails().selectedCity,
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
	function baseOperations() {
		//Apply autocomplete when content is loaded on the page
		//$timeout is used so that autocomplete is binded in the next digest cycle
		$timeout(function() {
			//Binding tooltip on back to top button
			$('[data-toggle="tooltip"]').tooltip({
				placement : 'top'
			});

			//Click operation on back to top button
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

			//vm.mainCoverHeading = baseFactory.getMainCoverHeading();

		}, 1000);
	};

	/* Methods Invoked in Correct Sequence */
	vm.init();
	vm.defineListeners();
	vm.defineMethods();
	vm.invokeInitialMethods();
	/* Invoking method for preloading Images */
	preloadImages('/images/about_us_cover.jpg', '/images/faq_cover.jpg', '/images/disclaimer.jpg', '/images/tou.jpg', '/images/privacypolicy.jpg');

});
