/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the login module
 */

app.controller('signupController', function($scope, ModalService, close, $element, LoginFactory) {

	var vm = this;
	
	
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
        	if(accountType === 'user')
        		createAccountParams = angular.copy(vm.signupUser);
        	else
        		createAccountParams = angular.copy(vm.signupVendor);		
        var promise = LoginFactory.user.create(createAccountParams).$promise;

            return promise.then(function(data) {
                return data;
            }, function(error) {
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