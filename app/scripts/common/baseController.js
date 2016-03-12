/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the <body> tag
 */

app.controller('baseController', function($scope, $rootScope, $route, baseFactory, $timeout, $location, HomeFactory, $compile, ContactFactory, usSpinnerService, $routeParams) {

	var vm = this;

	//Application level variables
	$rootScope.showCover = true;

	/*
	 *Initializing all the variables
	 *
	 * */
	vm.init = function() {

		vm.selectedCategory = baseFactory.getSelectedCategory();
		vm.categoryMap = baseFactory.categoryMap;
		vm.coverUrl = baseFactory.getCoverUrl();
		vm.contactForm = {};

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
			window.scrollTo(0, 0);
			vm.stopLoader();
		});

		/*
		 * handler for sliding
		 * the location dropdown up
		 * for click of document
		 *
		 * */
		$(document).on('click', function(e) {
			if (!($(e.target).hasClass('lp-select-city-text') || $(e.target).hasClass('lp-selected-city') || $(e.target).hasClass('location-icon') || $(e.target).hasClass('lp-label-city')))
				$('.lp-city-dropdown').slideUp();
			if (!($(e.target).hasClass('lp-select-category-text') || $(e.target).hasClass('lp-selected-category') || $(e.target).hasClass('category-icons') || $(e.target).hasClass('lp-label-category')))
				$('.lp-category-dropdown').slideUp();
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
		 * is invoked
		 * when all the content
		 * for the view is loaded
		 *
		 * */
		$scope.$on('$viewContentLoaded', function() {

			applyAutocomplete();

			//Apply Background color change function on scroll
			animateHeaderBgColor();

			//Hiding loader screen when view has loaded completely
			window.scrollTo(0, 0);

			vm.stopLoader();
			vm.coverUrl = baseFactory.getCoverUrl();
			vm.mainCoverHeading = baseFactory.getMainCoverHeading();
		});

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

	};

	/*
	 *
	 * Defining the Miscellaneous Methods
	 *
	 * */

	vm.defineMethods = function() {

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
			});
		};

		/*
		 *
		 * Called when the search button
		 * is clicked from the cover section
		 *
		 * */
		vm.clicked = function() {
			$route.reload();
			baseFactory.setCoverUrl(vm.selectedCategory);
			baseFactory.setMainCoverHeading(vm.selectedCategory);
			if (vm.searchData == undefined || vm.searchData == null) {
				$location.path('/vendors/' + baseFactory.getSelectedCity() + '/' + vm.selectedCategory);
			} else {
				$location.path('/vendors/' + baseFactory.getSelectedCity() + '/' + vm.selectedCategory + '/' + vm.searchData);
			}

		};

		/*
		 *
		 * Called when the user chooses
		 * different option from city dropdown
		 *
		 * */
		vm.setCity = function($event) {
			var selectedCityName = angular.element($event.currentTarget)[0].innerHTML;
			vm.selectedCity = selectedCityName;
			var selectedCityId = angular.element($event.currentTarget)[0].getAttribute('data-id');
			baseFactory.setSelectedCity(selectedCityId);
			vm.toggleDropdown();
			if ($location.path().toString().match(/\/vendors\//i) != null) {
				if (vm.searchData == undefined || vm.searchData == null) {
					$location.path('/vendors/' + baseFactory.getSelectedCity() + '/' + vm.selectedCategory);
				} else {
					$location.path('/vendors/' + baseFactory.getSelectedCity() + '/' + vm.selectedCategory + '/' + vm.searchData);
				}
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
		vm.setCategory = function($event) {
			var selectedCategoryValue = angular.element($event.currentTarget)[0].getAttribute('data-key');
			baseFactory.setSelectedCategory(selectedCategoryValue);
			vm.selectedCategory = selectedCategoryValue;
			vm.toggleCategoryDropdown();
			if ($location.path().toString().match(/\/vendors\//i) != null) {
				if (vm.searchData == undefined || vm.searchData == null) {
					$location.path('/vendors/' + baseFactory.getSelectedCity() + '/' + vm.selectedCategory);
				} else {
					$location.path('/vendors/' + baseFactory.getSelectedCity() + '/' + vm.selectedCategory + '/' + vm.searchData);
				}
			}
		};

		/*
		 *
		 * toggle city dropdown
		 *
		 * */
		vm.toggleDropdown = function() {
			$('.lp-city-dropdown').slideToggle();
		};

		/*
		 *
		 * toggle category dropdown
		 *
		 * */
		vm.toggleCategoryDropdown = function() {
			$('.lp-category-dropdown').slideToggle();
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

		/*
		 *
		 * Called when user clicks
		 * submit button from contactus form
		 *
		 * */
		vm.submitEnquiry = function() {

			ContactFactory.submitEnquiry.submit(vm.contactForm).$promise.then(function(data) {

				vm.contactForm = {};
				$scope.form.contactForm.$setPristine();
				$scope.form.contactForm.$setUntouched();
				vm.submitted = false;
				$('#contactModal').modal('toggle');
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
				$('#contactModal').modal('toggle');
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

	};

	/*
	 *
	 * invoking initial Methods on pageLoad
	 *
	 * */
	vm.invokeInitialMethods = function() {
		vm.startLoader();
		populateCities();
	};

	/*
	 *
	 * Call for populating cities
	 *
	 * */
	function populateCities() {
		HomeFactory.loadCities.populateCities().$promise.then(function(data) {
			vm.citiesList = data.toJSON();
			var counter = 0;
			if (vm.citiesList && vm.citiesList != null) {
				angular.forEach(vm.citiesList, function(value, key) {
					if (counter == 0) {
						vm.selectedCity = value;
						baseFactory.setSelectedCity(key);
					}
					counter = counter + 1;

				});
			}
		}, function(error) {
			console.log('Error: ' + error);
		});
	}

	/*
	 *
	 * Call for header bg color animation
	 *
	 * */
	function animateHeaderBgColor() {
		var pageYoffset = window.pageYOffset, coverPage = document.getElementById("coverPage");
		if ( typeof pageYoffset != null && typeof pageYoffset != "undefined" && typeof coverPage != null && typeof coverPage != "undefined")
			$("#navbar").css("background-color", "rgba(243, 114, 84, " + pageYoffset / coverPage.clientHeight + ")");

		if ( typeof pageYoffset != null && typeof pageYoffset != "undefined")
			angular.element('#back-to-top').removeClass().addClass('show-' + Math.floor(pageYoffset / 200));

	}

	/*
	 *
	 * Call for setting city based on route params
	 *
	 * */
	function setCityOnRouteParams(cityId) {
		if (vm.citiesList && typeof vm.citiesList == 'object') {
			for (var key in vm.citiesList) {
				if (key == cityId) {
					vm.selectedCity = vm.citiesList[key];
					break;
				}
			}
		}

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
	 * Call for Applying autocomplete
	 *
	 * */
	function applyAutocomplete() {
		//Apply autocomplete when content is loaded on the page
		//$timeout is used so that autocomplete is binded in the next digest cycle
		$timeout(function() {
			angular.element('.home-search-box').autocomplete({
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
							if (error && error.data && error.data.errorCode == 400) {
								response(['No Results Found']);
							}
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
			});

			//Binding search button value on input field value length
			$scope.$watch("vm.searchData", function(newValue, oldvalue) {
				if (newValue && newValue.length > 0)
					$('.home-search-btn').text('SEARCH');
				else
					$('.home-search-btn').text('SEARCH ALL');
			});

			$('[data-toggle="tooltip"]').tooltip({
				placement : 'top'
			});

			angular.element("#back-to-top").on('click', function() {
				$("html, body").animate({
					scrollTop : 0
				}, "slow");
				return false;
			});

		});
	};

	function changeHomeScreenBgImages() {
		var index = 2;
		var intervalVariable = setInterval(function() {
			if ($('#coverPage').hasClass('home-screen-cover')) {
				if (index == 6)
					index = 1;
				$(".home-screen-cover").animate({
					opacity : "0.5"
				}, function() {
					$('.home-screen-cover').removeClass(function(index, className) {
						return className.match(/cover\d/g)[0];
					});
					$('.home-screen-cover').addClass('home-screen-cover cover' + index);
					$(".home-screen-cover").animate({
						opacity : "1"
					});
					index++;
				});

				
			}
		}, 5000);
	}

	/* Methods Invoked in Correct Sequence */
	vm.init();
	vm.defineListeners();
	vm.defineMethods();
	vm.invokeInitialMethods();
	changeHomeScreenBgImages();

});
