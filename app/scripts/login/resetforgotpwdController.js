/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the login module
 */

app.controller('resetforgotpwdController', function($scope, ModalService, close, $element, LoginFactory, userDetailsStore) {

	var vm = this;
	vm.messageType = '';
	vm.messageBarMessage = '';
	
	 vm.closePopup = function(){
	 	/* closing the modal using javascript instead of data attrs */
	 	$element.modal('hide');
	 	close();
	 	};
	 vm.sendDetails = function(){
	 	if($scope.form.resetforgotpwdForm.$valid){
	 		if(LoginFactory.getResetForgotPass().decodedUsername){
	 		var resetForgotPwdParams = {
	 			username: LoginFactory.getResetForgotPass().decodedUsername,
	 			password: vm.resetforgotpwdForm.newPassword,
	 		};
	 		var promise = LoginFactory.resetForgotPassword().send(resetForgotPwdParams).$promise;
	 		
	 		promise.then(function(data){
	 			$scope.showSignInPopup({type: 'Success', message: 'Message: Reset Password Successful, Please login using new password'});
	 		},function(error){
	 			vm.messageType = 'Error';
				vm.messageBarMessage = 'Error Message: Unable to reset password, Please try again after sometime';
	 		});
	 		}
	 		else{
	 			vm.messageType = 'Error';
				vm.messageBarMessage = 'Error Message: No User Found for reset forgot password';
	 		}
	 	}
	 	else{
	 		$scope.form.resetforgotpwdForm.$submitted = true;
	 	}
	 	
	 };	

});