app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	
    $routeProvider.when('/', {
    	url:'/login',
        controller: 'HomeController',
        templateUrl: 'views/home/home.html',
        controllerAs: 'vm',
        resolve: {
            cityMap: function(HomeFactory){
	            return HomeFactory.loadCities.populateCities().$promise.then(function(data){
					return data;
				},function(error){
					return error;
				})
	        }
    	}
    })
    .otherwise({ redirectTo: '/' });

}]);