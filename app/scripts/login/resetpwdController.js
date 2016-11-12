/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the login module
 */

app.controller('resetpwdController', function($scope, ModalService, close, $element) {

	var vm = this;
	vm.submitted = false;
	
	 vm.closePopup = function(){
	 	/* closing the modal using javascript instead of data attrs */
	 	$element.modal('hide');
	 	close();
	 	};
	 vm.sendDetails = function(){
	 	vm.submitted = true;
	 	if(vm.resetpwdForm.newPassword === vm.resetpwdForm.confirmNewPassword){
	 	/* Rest call to be written here */
	 	}
	 	else{
	 		vm.errorMsg = 'New Password and Confirm New Password does not match';
	 	}
	 };	

});