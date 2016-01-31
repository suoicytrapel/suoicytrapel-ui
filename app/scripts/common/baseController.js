/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the <body> tag
 */

app.controller('baseController', function($scope, $rootScope, baseFactory, $timeout, $location, HomeFactory, HomeService) {

	var vm = this;

	vm.init = function() {
		vm.selectedCategory = baseFactory.getSelectedCategory();
		vm.categoryMap = baseFactory.categoryMap;
		$rootScope.selectedCity = "1";
		vm.ribbonOpened = false;
		vm.ribbonIconClasses = ['fa-university', 'fa-cutlery', 'fa-birthday-cake', 'fa-camera', 'fa-cab', 'fa-beer'];
		chooseRibbonDefaultCategory();
		applyAutocomplete();
	};

	/*	Applying watch on selectedCategory*/
	$scope.$watch(baseFactory.getSelectedCategory, function(newValue, oldValue) {
		vm.selectedCategory = newValue;
		chooseRibbonDefaultCategory();
	});

	vm.categoryChanged = function() {
		baseFactory.setSelectedCategory(vm.selectedCategory);
	};

	vm.clicked = function() {
		HomeService.setSearchParam(vm.searchData);
		$location.path('/search/');
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

	function chooseRibbonDefaultCategory() {
		var index = 0;
		for (var category in vm.categoryMap) {
			if (vm.categoryMap[category] == vm.selectedCategory)
				break;
			else
				++index;
		}
		angular.element('.ribbon-tab:nth-child(' + (index + 1) + ')').addClass('active').siblings().removeClass('active');
		vm.indexActive = index;
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
		});
	};

	vm.init();
	vm.defineListeners();
});
