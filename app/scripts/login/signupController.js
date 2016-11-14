/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the login module
 */

app.controller('signupController', function($scope, ModalService, close, $element, LoginFactory) {

	var vm = this;
	vm.messageType = ''; /* Accepts only 'Error' or 'Success' as values */
	vm.messageBarMessage = '';
	
	 vm.closePopup = function(){
	 	/* closing the modal using javascript instead of data attrs */
	 	$element.modal('hide');
	 	close();
	 	};

		vm.showSignInPopup = function() {
		vm.closePopup();
		ModalService.showModal({
			templateUrl : "/views/login/signin.html",
			controller : "loginController",
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

	vm.createAccount = function(accountType){
        //vm.signupUser.isAppuser = true;
        var createAccountParams = null;
        if(($scope.form.signupFormUser.$valid && accountType === 'user') || ($scope.form.signupFormVendor.$valid && accountType === 'vendor')){
        	if(accountType === 'user'){
        		createAccountParams = angular.copy(vm.signupUser);
        		createAccountParams.userRole = 'USER';
        		}
        	else{
        		createAccountParams = angular.copy(vm.signupVendor);	
        		createAccountParams.userRole = 'VENDOR';
        		}	

        		createAccountParams.username = createAccountParams.email;
        		createAccountParams.isAppuser = true;
        		createAccountParams.confirmPassword = undefined;

        var promise = LoginFactory.createUser.create(createAccountParams).$promise;

            return promise.then(function(data) {
            	vm.messageType = 'Success'; /* Accepts only 'Error' or 'Success' as values */
				vm.messageBarMessage = 'Success Message: User Successfully Created';
				vm.showSignInPopup();
                return data;
            }, function(error) {
            	vm.messageType = 'Error'; /* Accepts only 'Error' or 'Success' as values */
				vm.messageBarMessage = 'Error Message: Error in creating User, Please contact System Admin';
                //$location.path('/bad-request/');
            });
       }
       else{
       	if(accountType === 'user')
       	$scope.form.signupFormUser.$submitted = true;
       	else
       	$scope.form.signupFormVendor.$submitted = true;
       }
    };

});