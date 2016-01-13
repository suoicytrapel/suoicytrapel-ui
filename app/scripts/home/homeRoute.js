var app = angular.module('leparticiousUiApp');

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	 $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: 'views/home.html',
        controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });

}]);