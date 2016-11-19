app.controller('HomeController', function(HomeFactory, $rootScope, $scope, baseFactory, $location, ContactFactory, $timeout, recentAdditions, activateAccount, subCategories, DataFactory, appDetailsStore) {
	var vm = this;
	vm.init = function() {
		$rootScope.showCover = true;
		$rootScope.currentPage = 'homePage';
		$rootScope.breadCrumbLinks = {};
		$rootScope.dataPageBreadCrumbPath = null;
		
		/* Trigger signIn Popup based on activate Account Result data */
		if(activateAccount){
			if(activateAccount == 'Success'){
				$scope.showSignInPopup({type: 'Success', message: 'Account Activation Successful! Please Sign In with your credentials'});	
			}
			else if(activateAccount == 'Error'){
				$scope.showSignInPopup({type: 'Warning', message: 'Account Activation Error! Please Click on the activation link again'});
			}
		}
		
		
		
		vm.subcatSwiperObj = null;
		vm.customersaySwiperObj = null;
		vm.portfolioSwiperObj = null;
		vm.portfolioImages = baseFactory.ourPortfolioImageUrls;
		vm.recentlyAddedData = recentAdditions;
		vm.subCategoriesMap = subCategories;
		vm.mergedSubCategoriesMap = mergeSubCategoriesMap();
		vm.selectedCategory = appDetailsStore.getAppDetails().selectedCategory;
		vm.categoryMap = baseFactory.categoryMap;
		vm.subCategorySelected = 'VENUE';
		vm.subcategorySwiperBrkpoints = {
				// when window width is <= 767px
				600 : {
					slidesPerView : 1,
					spaceBetweenSlides : 0
				},
				// when window width is <= 991px
				960 : {
					slidesPerView : 3,
					spaceBetweenSlides : 10
				},
				// when window width is <= 1199px
				1280 : {
					slidesPerView : 4,
					spaceBetweenSlides : 5
				},
				
				1920 : {
					slidesPerView : 5,
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
	/*$scope.$on('cityChangedEvent', function() {
		vm.fetchRecentAdditions();
	});*/

	/* Applying boxer on Portfolio items
	 *
	 *  */
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

	/*
	 Rest Call for fetching Recent Additions Data from backend
	 * */
	/*vm.fetchRecentAdditions = function() {
		var cityId = baseFactory.getSelectedCity();
		HomeFactory.fetchAdditions.recentAdditions(cityId).$promise.then(function(data) {
			vm.recentlyAddedData = data;

		}, function(error) {
			console.log(error);
		});

	};*/
	
	/*
	 Method for routing to the next page - Details Page
	 * */
	vm.fetchDetails = function(name, category) {
		var searchParam = name;
		$location.path('/details/' + appDetailsStore.getAppDetails().selectedCity + '/' + category + '/' + searchParam);
	};
	
	/*
	 Method for emitting page data has been populated to the base controller
	 so that the loader can be stopped
	 * */
	vm.emitPageDataPopulated = function() {
		$scope.$emit('pageDataPopulated');
	};
	
	/*
	 Method for clicking any subcategory icon in the carousel
	 and navigating to next page(data page) with the filters remembered
	 * */
	vm.setSelectedFilter = function (category, subcategory){
		if(appDetailsStore.getAppDetails().selectedCity){
		var filterName = subcategory.name;
		DataFactory.setSelectedFilterName(filterName);
		//baseFactory.setSelectedCategory(category.toUpperCase());
		appDetailsStore.setSelectedCategory(category.toUpperCase());
		$location.path('/vendors/' + appDetailsStore.getAppDetails().selectedCity + '/' + category.toUpperCase());
	}
	};
	
	vm.init();
	vm.emitPageDataPopulated();

});
