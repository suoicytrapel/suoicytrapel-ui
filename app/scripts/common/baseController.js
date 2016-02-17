/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the <body> tag
 */

app.controller('baseController', function($scope, $rootScope, $route, baseFactory, $timeout, $location, HomeFactory, HomeService, $compile, ContactFactory, usSpinnerService) {

	var vm = this;
	$scope.form = {};
	vm.contactForm = {};

	vm.init = function() {
		vm.selectedCategory = baseFactory.getSelectedCategory();
		vm.categoryMap = baseFactory.categoryMap;
		$rootScope.selectedCity = "1";

		applyAutocomplete();
		$rootScope.showCover = true;

		/*Called when the view in ng-view has started loading and successfully loaded*/

		$rootScope.$on("$routeChangeStart", function() {
			vm.showFooter = false;
			vm.startLoader();
		});

		$rootScope.$on("$routeChangeSuccess", function() {
			vm.showFooter = true;
			window.scrollTo(0,0);
			vm.stopLoader();
		});
		
		window.scrollTo(0,0);

		/*Apply background color change function on window scroll*/
		$(window).on('scroll', function() {
			animateHeaderBgColor();
		});

		vm.startLoader = function() {
			usSpinnerService.spin('home-page-spinner');
			vm.showLoaderScreen = true;			
		};

		vm.stopLoader = function() {
			vm.showLoaderScreen = false;
			usSpinnerService.stop('home-page-spinner');
		};

		vm.startLoader();

	};

	/*	Applying watch on selectedCategory
	 $scope.$watch(baseFactory.getSelectedCategory, function(newValue, oldValue) {
	 vm.selectedCategory = newValue;
	 chooseRibbonDefaultCategory();
	 });*/

	vm.categoryChanged = function() {
		baseFactory.setSelectedCategory(vm.selectedCategory);
	};

	vm.clicked = function() {
		HomeService.setSearchParam(vm.searchData);
		$route.reload();
		$location.path('/search/');
	};
	
	vm.setCity = function($event){
		var selectedCityName = angular.element($event.currentTarget)[0].innerHTML;
		angular.element('.lp-selected-city').text(selectedCityName);
		vm.toggleDropdown();
	};
	
	vm.toggleDropdown = function(){
		$('.lp-city-dropdown').slideToggle();
	};
	/*Defining Listeners*/
	vm.defineListeners = function() {

		vm.selectCategory = function(index) {
			console.log('index ' + index);
			angular.element('.ribbon-tab:nth-child(' + (index + 1) + ')').addClass('active').siblings().removeClass('active');
			var updatedValue = angular.element('.ribbon-tab.active').data('value');
			baseFactory.setSelectedCategory(updatedValue);
			$scope.$broadcast('ribbonCategoryChanged', updatedValue);
		};

	};

	function animateHeaderBgColor() {
		var pageYoffset = window.pageYOffset, coverPage = document.getElementById("coverPage");
		if ( typeof pageYoffset != null && typeof pageYoffset != "undefined" && typeof coverPage != null && typeof coverPage != "undefined")
			$("#navbar").css("background-color", "rgba(243, 114, 84, " + pageYoffset / coverPage.clientHeight + ")");
	}

	/* Commenting the autoComplete applied for ribbon search box
	 function applyAutocomplete() {
	 //Apply autocomplete when content is loaded on the page
	 $scope.$on('$viewContentLoaded', function() {
	 angular.element('.ribbon-search-box').autocomplete({
	 source : ['ankit', 'anki', 'ank', 'mohit', 'mohi', 'moh'],
	 });
	 });
	 }*/

	function applyAutocomplete() {
		//Apply autocomplete when content is loaded on the page
		$scope.$on('$viewContentLoaded', function() {
			angular.element('.home-search-box').autocomplete({
				source : function(request, response) {
					if (request.term.length > 2) {
						console.log(request.term);
						var searchRequestDTO = {
							searchType : vm.selectedCategory,
							searchString : request.term,
							cityId : $rootScope.selectedCity
						};
						HomeFactory.loadList.populate(searchRequestDTO).$promise.then(function(data) {
							response(data);
						}, function(error) {
							console.log(error);
						});
					}
				},
				select : function(event, ui) {
					//stateid = (ui.item.lable);
					console.log(ui.item.label);
					vm.searchData = (ui.item.label);
				}
			});

			//Apply Background color change function on scroll
			animateHeaderBgColor();

			//Hiding loader screen when view has loaded completely
			vm.stopLoader();
		});
	};

	vm.openContactForm = function() {
		$("#captcha").html("");
		var template = '<simple-captcha valid="captchaValid"></simple-captcha>';
		var captchaTemplate = angular.element(template);
		//Now compile the template with scope $scope
		$compile(captchaTemplate)($scope);
		angular.element('#captcha').append(captchaTemplate);
		$('#contactModal').modal('toggle');
	};

	vm.submitEnquiry = function() {
		ContactFactory.submitEnquiry.submit(vm.contactForm).$promise.then(function(data) {
			vm.contactForm = {};
			$scope.form.contactForm.$setPristine();
			$scope.form.contactForm.$setUntouched();
			vm.submitted = false;
			$('#contactModal').modal('toggle');
		}, function(error) {
			$scope.form.contactForm.$setPristine();
			vm.contactForm = {};
			$('#contactModal').modal('toggle');
			console.log(error);
		});
	};

	vm.init();
	vm.defineListeners();
});
