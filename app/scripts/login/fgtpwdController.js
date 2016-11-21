/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the login module
 */

app.controller('fgtpwdController', function($scope, ModalService, close, $element, LoginFactory) {

	var vm = this;

	
	 vm.closePopup = function(){
	 	/* closing the modal using javascript instead of data attrs */
	 	$element.modal('hide');
	 	close();
	 	};
	 
	 vm.showSignInPopup = function(msg) {
		vm.closePopup();
		ModalService.showModal({
			templateUrl : "/views/login/signin.html",
			controller : "loginController",
			controllerAs : "vm",
		}).then(function(modal) {
			/* Opening a modal via javascript */
			modal.element.modal();
			
			if(msg){
			modal.controller.messageType = msg.type;
			modal.controller.messageBarMessage = msg.message;
			}
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
	 vm.sendDetails = function(){	 	
	 	/* Rest call to be written here */
	 	if($scope.form && $scope.form.fgtpwdForm.$valid){
	 		LoginFactory.forgotPwd.send({username: vm.fgtpwdForm.email}).$promise.then(function(){
	 			console.log('forgot password successful');
	 			 vm.closePopup();
	 			 vm.showSignInPopup({type: 'Warning', message: 'Message: Password has been sent to your registered Email ID. Please Login using the same'});
	 		},function(error){
	 			vm.messageType = 'Error'; /* Accepts only 'Error' or 'Success' as values */
				vm.messageBarMessage = 'Error Message: Error in finding User, Please contact System Admin';
	 		});
	 	}
	 	else{
	 		$scope.form.fgtpwdForm.$submitted = true;
	 	}
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

});