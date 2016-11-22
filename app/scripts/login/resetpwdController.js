/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the login module
 */

app.controller('resetpwdController', function($scope, ModalService, close, $element, LoginFactory, userDetailsStore) {

	var vm = this;
	vm.messageType = '';
	vm.messageBarMessage = '';
	
	 vm.closePopup = function(){
	 	/* closing the modal using javascript instead of data attrs */
	 	$element.modal('hide');
	 	close();
	 	};
	 vm.sendDetails = function(){
	 	if($scope.form.resetpwdForm.$valid){
	 		var token = userDetailsStore.getLoggedInUserDetails().tokenType + ' ' + userDetailsStore.getLoggedInUserDetails().accessToken;
	 		var resetPwdParams = {
	 			username: userDetailsStore.getLoggedInUserDetails().email,
	 			password: vm.resetpwdForm.newPassword,
	 			oldPassword: vm.resetpwdForm.oldPassword
	 		};
	 		var promise = LoginFactory.resetPwd(token).send(resetPwdParams).$promise;
	 		
	 		promise.then(function(data){
	 			$scope.logout();
	 			$scope.showSignInPopup({type: 'Success', message: 'Message: Reset Password Successful, Please login using new credentails'});
	 		},function(error){
	 			vm.messageType = 'Error';
				vm.messageBarMessage = 'Error Message: Unable to reset password, Please try again after sometime';
	 		});
	 	}
	 	else{
	 		$scope.form.resetpwdForm.$submitted = true;
	 	}
	 	
	 };	

});