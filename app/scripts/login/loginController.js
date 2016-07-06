/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the login module
 */

app.controller('loginController', function($scope, $http) {

	var vm = this;

	

	vm.onLogin = function () {
            console.log('Attempting login with username ' + $scope.vm.username + ' and password ' + $scope.vm.password);

            $scope.vm.submitted = true;

            if ($scope.form.$invalid) {
                return;
            }

            $scope.login('hello', vm.password);

        };

     $scope.login = function (username, password) {
            var postData = $scope.preparePostData();

            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/rest/v1/authenticate',
                data: postData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Requested-With": 'XMLHttpRequest'
                }
            })
            .then(function(response) {
                if (response.data == 'ok') {
                    window.location.replace('/resources/calories-tracker.html');
                }
                else {
                    $scope.vm.errorMessages = [];
                    $scope.vm.errorMessages.push({description: 'Access denied'});
                }
            });
        };

         $scope.preparePostData = function () {
            var username = $scope.vm.username != undefined ? $scope.vm.username : '';
            var password = $scope.vm.password != undefined ? $scope.vm.password : '';
            var email = $scope.vm.email != undefined ? $scope.vm.email : '';

            return 'username=' + username + '&password=' + password + '&email=' + email;
        };


}); 