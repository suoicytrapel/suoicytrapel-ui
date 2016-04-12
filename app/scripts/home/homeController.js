app.controller('HomeController', function(HomeFactory, $rootScope, $scope, baseFactory, $location, ContactFactory, $timeout, recentAdditions) {
	var vm = this;
	vm.init = function() {
		$rootScope.showCover = true;
		$rootScope.breadCrumbLinks = {};
		$rootScope.dataPageBreadCrumbPath = null;
		vm.portfolioImages = baseFactory.ourPortfolioImageUrls;
		vm.recentlyAddedData = recentAdditions;
		vm.subCategoriesMap = baseFactory.subCategoriesMap;
		vm.selectedCategory = baseFactory.getSelectedCategory();
	};

	/* Listens to cityChangedEvent
	 * to update recent additions section */
	$scope.$on('cityChangedEvent', function() {
		vm.fetchRecentAdditions();
	});

	$scope.$watch(function() {
		return baseFactory.selectedCategory;
	}, function(newValue, oldValue) {
		if (newValue !== oldValue) {
			vm.selectedCategory = newValue;
			var lowerCaseValue = newValue.toLowerCase();
			if(!($('.subcategory-carousel').hasClass(lowerCaseValue))){
				$('.subcategory-carousel').addClass(lowerCaseValue);
				$timeout(function(){vm.applySwiperOnSubcategories(newValue);});
			}		
		}
	});

	vm.applyLibrariesOnPortfolio = function() {
		showcasePortfolio();
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

	function showcasePortfolio() {
		var mySwiper = new Swiper('.portfolio-swiper-container', {
			initialSlide : 2,
			effect : 'coverflow',
			grabCursor : true,
			centeredSlides : true,
			slidesPerView : 'auto',
			coverflow : {
				rotate : 22,
				stretch : 0,
				depth : 110,
				modifier : 1,
				slideShadows : true
			},
			nextButton : '.portfolio-swiper-button-next',
			prevButton : '.portfolio-swiper-button-prev',
			preloadImages : false,
			lazyLoading : true,
			spaceBetween : 20,
		});

	}


	vm.applySwiperOnSubcategories = function(className) {
		//mySwiper.destroy();
		new Swiper('.subcategory-swiper-container.' + className, {
			effect : 'slide',
			grabCursor : true,
			speed: 500, 
			slidesPerView : '5',
			nextButton : '.' + className + '.subcategory-swiper-button-next',
			prevButton : '.' + className + '.subcategory-swiper-button-prev',
			spaceBetween : 20,
			breakpoints : {
				// when window width is <= 767px
				767 : {
					slidesPerView : 2,
					spaceBetweenSlides : 10
				},
				// when window width is <= 991px
				991 : {
					slidesPerView : 5,
					spaceBetweenSlides : 20
				},
				// when window width is <= 1199px
				1199 : {
					slidesPerView : 5,
					spaceBetweenSlides : 20
				}
			}

		});
		//mySwiper.slideTo(0);
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

	vm.init();
	vm.emitPageDataPopulated();

});
