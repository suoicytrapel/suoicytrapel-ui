app.config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
	
    $routeProvider.when('/', {
    	url:'/login',
        controller: 'HomeController',
        templateUrl: 'views/home/home.html',
        controllerAs: 'vm',
        resolve: {
            cityMap: function(HomeFactory){
	            return HomeFactory.loadCities.populateCities().$promise.then(function(data){
					return data.toJSON();
				},function(error){
					return error;
				})
	        }
    	}
    }).when('/search/', {
        url:'/search',
        controller: 'DataController',
        templateUrl: 'views/data/data.html',
        controllerAs: 'vm',
        resolve: {
            filters: function(DataFactory, baseFactory, $rootScope){
                var selectedCategory = baseFactory.getSelectedCategory();
                var filterRequestDTO = {
                    searchType : selectedCategory,
                    cityId : $rootScope.selectedCity
                }
                return DataFactory.filters.loadFilters(filterRequestDTO).$promise.then(function(data){
                    return data.toJSON();
                },function(error){
                    return error;
                })
            }
        }
    })
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);

}]);