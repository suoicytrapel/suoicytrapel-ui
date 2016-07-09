app.controller('HomeController', function(HomeFactory, $rootScope, $scope, baseFactory, $location, ContactFactory, $timeout, recentAdditions) {
	var vm = this;
	vm.init = function() {
		$rootScope.showCover = true;
		$rootScope.currentPage = 'homePage';
		$rootScope.breadCrumbLinks = {};
		$rootScope.dataPageBreadCrumbPath = null;
		vm.portfolioImages = baseFactory.ourPortfolioImageUrls;
		vm.recentlyAddedData = recentAdditions;
		vm.subCategoriesMap = baseFactory.subCategoriesMap;
		vm.selectedCategory = baseFactory.getSelectedCategory();
		vm.categoryMap = baseFactory.categoryMap;
		vm.subCategorySelected = 'VENUE';
		vm.subcategorySwiperBrkpoints = {
				// when window width is <= 767px
				767 : {
					slidesPerView : 1,
					spaceBetweenSlides : 5
				},
				// when window width is <= 991px
				991 : {
					slidesPerView : 2,
					spaceBetweenSlides : 10
				},
				// when window width is <= 1199px
				1199 : {
					slidesPerView : 3,
					spaceBetweenSlides : 10
				}
		};
		vm.showcaseSwiperCoverflow = {
				rotate : 22,
				stretch : 0,
				depth : 110,
				modifier : 1,
				slideShadows : true
		};
	};

	/* Listens to cityChangedEvent
	 * to update recent additions section */
	$scope.$on('cityChangedEvent', function() {
		vm.fetchRecentAdditions();
	});

	
	vm.applyLibrariesOnPortfolio = function() {
		for (var k in vm.portfolioImages) {
			angular.element('.' + k).boxer({
				formatter : formatCaptions,
			});
		}

		/* Invoke the method for styling and Parsing the Captions present
		 * on the boxer carousel */
		function formatCaptions($target) {
			if ($target.attr("title") == 'EventCover') {
				var className = $target.attr("class").split('-');
				var changedTitle = '';
				for (var k = 0; k < className.length; k++) {
					changedTitle += className[k] + ' ';
				}
				$target.attr("title", changedTitle + 'Moment1');
			}

			return '<h4>' + $target.attr("title") + '</h4>';
		}

	};

	vm.fetchRecentAdditions = function() {
		var cityId = baseFactory.getSelectedCity();
		HomeFactory.fetchAdditions.recentAdditions(cityId).$promise.then(function(data) {
			vm.recentlyAddedData = data;

		}, function(error) {
			console.log(error);
		});

	};

	vm.fetchDetails = function(name, category) {
		var searchParam = name;
		$location.path('/details/' + baseFactory.getSelectedCity() + '/' + category + '/' + searchParam);
	};

	vm.emitPageDataPopulated = function() {
		$scope.$emit('pageDataPopulated');
	};
	
	vm.showHideSubCategories = function(){
		$('#subcategoryForm').slideToggle();
	};
	
	vm.init();
	vm.emitPageDataPopulated();

});
