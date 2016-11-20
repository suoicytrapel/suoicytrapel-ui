wizardApp.controller('wizardController', function($rootScope, progressbarService) {
	var vm = this;
	/* current page adds as a class on body */
	$rootScope.currentPage = 'wizard';
	
	vm.showProgressbar = function(){
		progressbarService.enableProgressbar(true);
	};
	
});
