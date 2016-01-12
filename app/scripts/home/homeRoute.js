var app = angular.module('leparticiousUiApp');

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: 'views/home.html',
        controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });

}]);