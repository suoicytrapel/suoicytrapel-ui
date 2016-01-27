app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	
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
    }).when('/search', {
        url:'/search',
        controller: 'DataController',
        templateUrl: 'views/data/data.html',
        controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });

}]);