var app = angular.module('leparticiousUiApp');

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	
    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: 'views/home/home.html',
        controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });

}]);