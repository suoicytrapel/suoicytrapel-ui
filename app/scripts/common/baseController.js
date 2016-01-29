/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the <body> tag
 */

app.controller('baseController', function($scope, baseFactory, $timeout) {

	$scope.init = function() {
		$scope.selectedCategory = baseFactory.getSelectedCategory();
		$scope.categoryMap = baseFactory.categoryMap;
		$scope.ribbonOpened = false;
		$scope.ribbonIconClasses = ['fa-university', 'fa-cutlery', 'fa-birthday-cake', 'fa-camera', 'fa-cab', 'fa-beer'];
		chooseRibbonDefaultCategory();
		applyAutocomplete();
	};

	/*	Applying watch on selectedCategory*/
	$scope.$watch(baseFactory.getSelectedCategory, function(newValue, oldValue) {
		$scope.selectedCategory = newValue;
		chooseRibbonDefaultCategory();
	});

	/*Defining Listeners*/
	$scope.defineListeners = function() {

		$scope.selectCategory = function(index) {
			console.log('index ' + index);
			angular.element('.ribbon-tab:nth-child(' + (index + 1) + ')').addClass('active').siblings().removeClass('active');
			var updatedValue = angular.element('.ribbon-tab.active').data('value');
			baseFactory.setSelectedCategory(updatedValue);
			$scope.$broadcast('ribbonCategoryChanged', updatedValue);
		};
	};

	function chooseRibbonDefaultCategory() {
		var index = 0;
		for (var category in $scope.categoryMap) {
			if ($scope.categoryMap[category] == $scope.selectedCategory)
				break;
			else
				++index;
		}
		angular.element('.ribbon-tab:nth-child(' + (index + 1) + ')').addClass('active').siblings().removeClass('active');
		$scope.indexActive = index;
	}

	function applyAutocomplete() {
		//Apply autocomplete when content is loaded on the page
		$scope.$on('$viewContentLoaded', function() {
			angular.element('.ribbon-search-box').autocomplete({
				source : ['ankit', 'anki', 'ank', 'mohit', 'mohi', 'moh'],
			});
		});
	}


	$scope.init();
	$scope.defineListeners();
});
