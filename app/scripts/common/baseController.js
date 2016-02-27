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
		vm.selectedCategory = sessionStorage.selectedCategory || baseFactory.getSelectedCategory();
		vm.categoryMap = baseFactory.categoryMap;
		baseFactory.setCoverUrl(sessionStorage.selectedCategory || vm.selectedCategory);
		baseFactory.setMainCoverHeading(sessionStorage.selectedCategory || vm.selectedCategory);
		vm.coverUrl = baseFactory.getCoverUrl();
		if(!sessionStorage.selectedCityId)
			sessionStorage.selectedCityId = '1';
		applyAutocomplete();
		$rootScope.showCover = true;
		$rootScope.showCityDropdown = true;

		/*Called when the view in ng-view has started loading and successfully loaded*/

		$rootScope.$on("$routeChangeStart", function() {
			vm.showFooter = false;
			vm.startLoader();
			
		});

		$rootScope.$on("$routeChangeSuccess", function() {
			vm.showFooter = true;
			window.scrollTo(0,0);
			vm.coverUrl = baseFactory.getCoverUrl();
			vm.mainCoverHeading = baseFactory.getMainCoverHeading();
			vm.stopLoader();
		});
		
		window.scrollTo(0,0);
		
		/* Sliding up location dropdown on clicking anywhere on the page */
		$(document).on('click',function(e){
			//e.preventDefault();
			//e.stopPropagation();
			if(!($(e.target).hasClass('lp-select-city-text') || $(e.target).hasClass('lp-selected-city') || $(e.target).hasClass('location-icon')))
			$('.lp-city-dropdown').slideUp();
		});

		/*Apply background color change function on window scroll*/
		$(window).on('scroll', function() {
			animateHeaderBgColor();
		});

		vm.startLoader = function() {
			usSpinnerService.spin('home-page-spinner');
			vm.showLoaderScreen = true;			
		};

		vm.stopLoader = function() {
		//Applyong timeout so that the loader screen and spinner is hided
		//in the next digest cycle	
			$timeout(function(){
			vm.showLoaderScreen = false;
			usSpinnerService.stop('home-page-spinner');
			});
		};

		vm.startLoader();

	};

	/* Code to Populate Cities */
	
	HomeFactory.loadCities.populateCities().$promise.then(function(data){
					vm.citiesList = data.toJSON();
					if(vm.citiesList && vm.citiesList != null)
					vm.selectedCity =  sessionStorage.selectedCity || vm.citiesList["1"]; 
				},function(error){
					console.log('Error: ' + error);
				});

	vm.categoryChanged = function() {
		baseFactory.setSelectedCategory(vm.selectedCategory);
		sessionStorage.selectedCategory = vm.selectedCategory;
	};

	vm.clicked = function() {
		HomeService.setSearchParam(vm.searchData);
		$route.reload();
		baseFactory.setCoverUrl(vm.selectedCategory);
		baseFactory.setMainCoverHeading(vm.selectedCategory);
		$location.path('/search/');
	};
	
	vm.setCity = function($event){
		var selectedCityName = angular.element($event.currentTarget)[0].innerHTML;
		vm.selectedCity = selectedCityName;
		sessionStorage.selectedCityId = angular.element($event.currentTarget)[0].getAttribute('data-id');
		sessionStorage.selectedCity = selectedCityName;
		vm.toggleDropdown();
		$route.reload();
	};
	
	vm.toggleDropdown = function(){
		$('.lp-city-dropdown').slideToggle();
	};
	/*Defining Listeners*/
	vm.defineListeners = function() {

		vm.selectCategory = function(index) {
			console.log('index ' + index);
			baseFactory.setSelectedCategory(updatedValue);
		};

	};

	function animateHeaderBgColor() {
		var pageYoffset = window.pageYOffset, coverPage = document.getElementById("coverPage");
		if ( typeof pageYoffset != null && typeof pageYoffset != "undefined" && typeof coverPage != null && typeof coverPage != "undefined")
			$("#navbar").css("background-color", "rgba(243, 114, 84, " + pageYoffset / coverPage.clientHeight + ")");
	}



	function applyAutocomplete() {
		//Apply autocomplete when content is loaded on the page
		$scope.$on('$viewContentLoaded', function() {
			angular.element('.home-search-box').autocomplete({
				source : function(request, response) {
					if (request.term.length > 1) {
						var searchRequestDTO = {
							searchType : vm.selectedCategory,
							searchString : request.term,
							cityId : sessionStorage.selectedCityId ? sessionStorage.selectedCityId : '1',
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
