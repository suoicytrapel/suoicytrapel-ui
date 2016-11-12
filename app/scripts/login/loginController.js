/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the login module
 */

app.controller('loginController', function($scope, $http, ModalService, LoginFactory) {

	var vm = this;

	

	vm.onLogin = function () {
            console.log('Attempting login with username ' + $scope.vm.username + ' and password ' + $scope.vm.password);

            $scope.vm.submitted = true;

            if ($scope.form.$invalid) {
                return;
            }

            $scope.login('hello', vm.password);

        };

     vm.login = function (username, password) {
            var postData = vm.preparePostData();

            $http({
                method: 'POST',
                url: 'http://localhost:8080/oauth/token',
                data: postData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "authorization": 'Basic YnJvd3Nlcjo='
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

         vm.preparePostData = function () {
            var username = vm.signinUser.email != undefined ? vm.signinUser.email : '';
            var password = vm.signinUser.password != undefined ? vm.signinUser.password : '';
            return 'scope=ui&grant_type=password&username=' + username + '&password=' + password;
        };


    $scope.googleLogin = function() 
    {
      var myParams = {
        'clientid' : '289437307644-2taus4lmi3469r65neo01ha0oj6vo1k1.apps.googleusercontent.com',
        'cookiepolicy' : 'single_host_origin',
        'callback' : 'loginCallback',
        'approvalprompt':'force',
        'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
      };
      gapi.auth.signIn(myParams);
    }
 
    $scope.fbLogin = function() {
      FB.login(function (response) {
        if (response.authResponse) {
          FB.api('/me?fields=first_name, last_name, picture, email', function (response) {
            vm.signupUser = {};
            vm.signupUser.name=response.first_name;
            vm.signupUser.email=response.email;
            vm.signupUser.username=response.username;
            vm.signupUser.isAppUser = false;
            vm.signupUser.userRole = 'enduser';
            vm.createAccount();
            /*FB.api('/me/picture?type=normal', function (response) {
              document.getElementById("profileImage").setAttribute("src", response.data.url);
            });*/
          });
        } else {
          alert("Login attempt failed!");
        }
      });
    };

    vm.showSignUpPopup = function() {
        //vm.closePopup();
        ModalService.showModal({
            templateUrl : "/views/login/signup.html",
            controller : "signupController",
            controllerAs : "vm",
        }).then(function(modal) {
            /* Opening a modal via javascript */
            modal.element.modal();
            /* returning a promise on closing a modal */
            modal.close.then(function(result) {
                console.log(result);
            });
            /* when closing modal on clicking outside modal area
             * the modal element should be removed form DOM */
            modal.element.on('hidden.bs.modal', function() {
                modal.controller.closePopup();
            });
        });
    };


    vm.showResetPwdPopup = function() {
        ModalService.showModal({
            templateUrl : "/views/login/resetpwd.html",
            controller : "resetpwdController",
            controllerAs : "vm",
        }).then(function(modal) {
            /* Opening a modal via javascript */
            modal.element.modal();
            /* returning a promise on closing a modal */
            modal.close.then(function(result) {
                console.log(result);
            });
            /* when closing modal on clicking outside modal area
             * the modal element should be removed form DOM */
            modal.element.on('hidden.bs.modal', function () {
            modal.controller.closePopup();
        });
        });
    };

    vm.createAccount = function(){
        var promise = LoginFactory.user.create(vm.signupUser).$promise;

            return promise.then(function(data) {
                return data;
            }, function(error) {
                $location.path('/bad-request/');
            });
    }
    
}); 