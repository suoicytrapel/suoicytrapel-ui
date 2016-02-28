app.config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
	
    $routeProvider.when('/', {
    	url:'/login',
        controller: 'HomeController',
        templateUrl: 'views/home/home.html',
        controllerAs: 'vm',
        resolve: {
	        changeCover: function(baseFactory){
	        	baseFactory.setCoverUrl('Home');
	        	baseFactory.setMainCoverHeading('Making Moments Memorable');
	        },
	        showCityDropdown: function($rootScope){
        		$rootScope.showCityDropdown = true;
        	}
    	}
    }).when('/search/', {
        url:'/search',
        controller: 'DataController',
        templateUrl: 'views/data/data.html',
        controllerAs: 'vm',
        resolve: {
            filters: function(DataFactory, baseFactory, $rootScope){
                var selectedCategory = sessionStorage.selectedCategory;
                var filterRequestDTO = {
                    searchType : selectedCategory,
                    cityId : sessionStorage.selectedCityId,
                };
                return DataFactory.filters.loadFilters(filterRequestDTO).$promise.then(function(data){
                    return data.toJSON();
                },function(error){
                    return error;
                });
            },
            showCityDropdown: function($rootScope){
        		$rootScope.showCityDropdown = true;
        	}
        }
    }).when('/details/:searchParam', {
        url:'/details',
        controller: 'detailController',
        templateUrl: 'views/detail/detail.html',
        controllerAs: 'vm',
        resolve: {
        	hideCityDropdown: function($rootScope){
        		$rootScope.showCityDropdown = false;
        	}
        }
    }).when('/aboutus/', {
        url:'/aboutus',
        controller: '',
        templateUrl: 'views/about/about.html',
        resolve: {
        	hideCover: function($rootScope){
        		$rootScope.showCover = false;
        	},
        	showCityDropdown: function($rootScope){
        		$rootScope.showCityDropdown = true;
        	}
        }
    }).when('/faq/', {
        url:'/faq',
        controller: '',
        templateUrl: 'views/faq/faq.html',
        resolve: {
        	hideCover: function($rootScope){
        		$rootScope.showCover = false;
        	},
        	showCityDropdown: function($rootScope){
        		$rootScope.showCityDropdown = true;
        	}
        }
    })
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);

}]);