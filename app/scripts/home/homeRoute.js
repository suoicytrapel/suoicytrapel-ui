app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	
    $routeProvider.when('/', {
    	url:'/login',
        controller: 'HomeController',
        templateUrl: 'views/home/home.html',
        controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });

}]);