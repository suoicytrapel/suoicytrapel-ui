app.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
     $rootScope
        .$on('$routeChangeSuccess',
            function(event){
 
                if (!$window.ga)
                    return;
 
                $window.ga('send', 'pageview', { page: $location.path() });
        });
}]);