/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the login module
 */

app.controller('loginController', function($scope, ModalService, close, $element) {

	var vm = this;

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
			modal.element.on('hidden.bs.modal', function () {
            modal.controller.closePopup();
        });
		});
	};
	
		vm.showfgtpwdPopup = function() {
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

	vm.closePopup = function() {
		/* closing the modal using javascript instead of data attrs */
		$element.modal('hide');
		close('close popup');
	};


}); 