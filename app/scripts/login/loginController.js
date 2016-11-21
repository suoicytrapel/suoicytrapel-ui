/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the login module
 */

app.controller('loginController', function($scope, $http, ModalService, $location, LoginFactory, $element, close, loginStatusService, loggedInUserDetails, userDetailsStore, $window, progressbarService) {

	var vm = this;
	
	vm.messageType = ''; /* Accepts only 'Error','Success' or 'Warning' as values */
	vm.messageBarMessage = '';
	
	vm.clearMessageBar = function(){
		vm.messageType = '';
		vm.messageBarMessage = '';
	};
       
     vm.login = function (loginType, isAppLogin) {
     	if(($scope.form.signinFormUser.$valid && loginType === 'user') || ($scope.form.signinFormVendor.$valid && loginType === 'vendor') || (isAppLogin === false)){
            if(isAppLogin === false)
            var postData =  'scope=ui&grant_type=password&username=' + vm.signupUser.username + '&password=' + vm.signupUser.email;
            else   
            var postData = vm.preparePostData(loginType);
            
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
                if (response.status == 200) {
                	console.log('authentication successful');
                	/*vm.messageType = 'Success';
					vm.messageBarMessage = 'Success Message: Login Successful';*/
					
					if(isAppLogin === false){ //Flow for Facebook or Google Login
						var userDetails = loggedInUserDetails(userDetailsStore.getLoggedInUserDetails().name, userDetailsStore.getLoggedInUserDetails().email, response.data.access_token, response.data.refresh_token, response.data.token_type, userDetailsStore.getLoggedInUserDetails().userRole, userDetailsStore.getLoggedInUserDetails().userImage);
                    	userDetailsStore.setLoggedInUserDetails(userDetails);
                    	
                    	loginStatusService.getSubjectToSubscribe().onNext({
                        isLoggedIn : true,
                    });
                    
                     vm.closePopup();
                     progressbarService.enableProgressbar(false);
					}
					
					else{ //Flow for App Login
                	var userDetails = loggedInUserDetails(null, null, response.data.access_token, response.data.refresh_token, response.data.token_type, null);
                    userDetailsStore.setLoggedInUserDetails(userDetails);

                   
                	/* Call for fetching the user details and saving it */
                	var token = userDetailsStore.getLoggedInUserDetails().tokenType + ' ' + userDetailsStore.getLoggedInUserDetails().accessToken;
                     var promise = LoginFactory.user(token).getLoggedInUser({userType: loginType, isAppUser: true}).$promise;

                    return promise.then(function(data) {
                        var userDetails = loggedInUserDetails(data.name, data.email, userDetailsStore.getLoggedInUserDetails().accessToken, userDetailsStore.getLoggedInUserDetails().refreshToken, userDetailsStore.getLoggedInUserDetails().tokenType, data.userRole);
                        userDetailsStore.setLoggedInUserDetails(userDetails);

                         loginStatusService.getSubjectToSubscribe().onNext({
                        isLoggedIn : true,
                    });
                    
					
                        vm.closePopup();
                        //return data;
                    }, function(error) {
                        //$location.path('/bad-request/');
                        vm.messageType = 'Error';
                    vm.messageBarMessage = 'Error Message: Unable to find user details. Please contact your system admin';
                    });
                  }
                }
                else {
                    console.log('Access Denied');
                    vm.messageType = 'Error';
				vm.messageBarMessage = 'Error Message: Access Denied';
                }
            },function(error){
            	vm.messageType = 'Error';
				vm.messageBarMessage = 'Error Message: Kindly Check your Credentials';
            });
           }
           else{
           	if(loginType === 'user')
           	$scope.form.signinFormUser.$submitted = true;
           	else
           	$scope.form.signinFormVendor.$submitted = true;
           }
        };

         vm.preparePostData = function (loginType) {
            //var username = vm.signinUser.email != undefined ? vm.signinUser.email : '';
            //var password = vm.signinUser.password != undefined ? vm.signinUser.password : '';
            var username = loginType === 'user' ? vm.signinUser.email : vm.signinVendor.email;
            var password = loginType === 'user' ? vm.signinUser.password : vm.signinVendor.password;
            console.log('Attempting login with username= ' + username + ' and password= ' + password);
            return 'scope=ui&grant_type=password&username=' + username + '&password=' + password;
        };

	/* Callback function for Google SignIn */
     $window.loginCallback = function(result)
    {
        if(result['status']['signed_in'])
        {
            var request = gapi.client.plus.people.get(
            {
                'userId': 'me'
            });
            request.execute(function (resp)
            {
                var email = '';
                if(resp['emails'])
                {
                    for(i = 0; i < resp['emails'].length; i++)
                    {
                        if(resp['emails'][i]['type'] == 'account')
                        {
                            email = resp['emails'][i]['value'];
                        }
                    }
                }
     
                var str = "Name:" + resp['displayName'] + "<br>";
                str += "Image:" + resp['image']['url'] + "<br>";
                str += "<img src='" + resp['image']['url'] + "' /><br>";
     
                str += "URL:" + resp['url'] + "<br>";
                str += "Email:" + email + "<br>";
                console.log('User Details:', str);
                //document.getElementById("profile").innerHTML = str;
                vm.signupUser = {};
            	vm.signupUser.name=resp['displayName'];
            	vm.signupUser.email=email;
            	vm.signupUser.username=email+'_socialUser';
            	vm.signupUser.password=email;
            	vm.signupUser.isAppUser = false;
            	vm.signupUser.userRole = 'USER';
            	vm.signupUser.userImage = resp.image.url;
            	vm.createAccount(angular.copy(vm.signupUser));

            
            });
     
        }
     
    };

     vm.googleLogin = function() 
    {
      var myParams = {
        'clientid' : '289437307644-2taus4lmi3469r65neo01ha0oj6vo1k1.apps.googleusercontent.com',
        'cookiepolicy' : 'single_host_origin',
        'callback' : 'loginCallback',
        'approvalprompt':'force',
        'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
      };
      gapi.auth.signIn(myParams);
      
      
    };

 
    vm.fbLogin = function() {
      FB.login(function (response) {
        if (response.authResponse) {
          FB.api('/me?fields=first_name, last_name, picture, email', function (response) {
            vm.signupUser = {};
            vm.signupUser.name=response.first_name + ' ' + response.last_name;
            vm.signupUser.email=response.email;
            vm.signupUser.username=response.email+'_socialUser';
            vm.signupUser.password=response.email;
            vm.signupUser.isAppUser = false;
            vm.signupUser.userRole = 'USER';
            vm.signupUser.userImage = response.picture.data.url;
            vm.createAccount(angular.copy(vm.signupUser));

            /*FB.api('/me/picture?type=normal', function (response) {
              document.getElementById("profileImage").setAttribute("src", response.data.url);
            });*/
          });
        } else {
          //alert("Login attempt failed!");
          vm.messageType = 'Error';
          vm.messageBarMessage = 'Error Message: Login with Facebook Failed';
        }
      },{
    	scope: 'public_profile,email'
  });
    };

    vm.showSignUpPopup = function() {
        vm.closePopup();
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
    	vm.closePopup();
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
    
    vm.showfgtpwdPopup = function(){
    	vm.closePopup();
        ModalService.showModal({
            templateUrl : "/views/login/forgotpwd.html",
            controller : "fgtpwdController",
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
	
	/* REST call for creating User from social (google or FB login) */
    vm.createAccount = function(signupUser){
    	progressbarService.enableProgressbar(true);
        var promise = LoginFactory.createUser.create(signupUser).$promise;
            return promise.then(function(data) {
            	console.log('user created');
                console.log(data);
                var userDetails = loggedInUserDetails(signupUser.name, signupUser.email, null, null, null, signupUser.userRole, signupUser.userImage);
                userDetailsStore.setLoggedInUserDetails(userDetails);
                    
                    //Now Login User
                    vm.login('',false);
            }, function(error) {
            	progressbarService.enableProgressbar(false);
                vm.messageType = 'Error';
          		vm.messageBarMessage = 'Error Message: Unable to Create User';
            });
    };
    
    vm.closePopup = function(){
	 	/* closing the modal using javascript instead of data attrs */
	 	$element.modal('hide');
	 	close();
	 	};
    
}); 