app.controller('HomeController', function(HomeFactory, $rootScope, $scope, baseFactory, $location, ContactFactory, $timeout, recentAdditions, subCategories, DataFactory) {
	var vm = this;
	vm.init = function() {
		$rootScope.showCover = true;
		$rootScope.currentPage = 'homePage';
		$rootScope.breadCrumbLinks = {};
		$rootScope.dataPageBreadCrumbPath = null;
		vm.subcatSwiperObj = null;
		vm.portfolioImages = baseFactory.ourPortfolioImageUrls;
		vm.recentlyAddedData = recentAdditions;
		vm.subCategoriesMap = subCategories;
		vm.mergedSubCategoriesMap = mergeSubCategoriesMap();
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
					slidesPerView : 4,
					spaceBetweenSlides : 5
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
	
	/* Method for updating subcategories carousel
	 * when the user toggles category buttons */
	
	vm.updateSubCategories = function(event,subcategory){
		angular.element(event.currentTarget).parent().toggleClass('active');
		angular.element('.subcategory-swiper-slide.'+subcategory).toggleClass('invisible');
		if(vm.subcatSwiperObj)
		vm.subcatSwiperObj.update(true);
	};
	
	/* Method to merge subCategories Map so that every 
	   subcategory becomes the part of an object
	   Done as per latest design to be shown on UI*/
	  
	function mergeSubCategoriesMap(){
		var mergedList = [];
		angular.forEach(vm.subCategoriesMap, function(value, key){
			angular.forEach(value, function(value1, key1){
				value1.parent = key.toLowerCase();
				mergedList.push(value1);
			});
		});
		return mergedList;
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

	vm.setSelectedFilter = function (category, subcategory){
		var filterName = subcategory.name;
		DataFactory.setSelectedFilterName(filterName);
		baseFactory.setSelectedCategory(category);
		$location.path('/vendors/' + baseFactory.getSelectedCity() + '/' + category);
	};
	
	vm.init();
	vm.emitPageDataPopulated();

});
