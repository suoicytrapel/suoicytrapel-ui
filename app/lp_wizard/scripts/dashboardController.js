wizardApp.controller('dashboardController', function($rootScope, progressbarService) {
	var vm = this;
	/* $rootscope.currentPage adds as a class on body */
	$rootScope.currentPage = 'dashboard';
	
	vm.showProgressbar = function(){
		progressbarService.enableProgressbar(true);
	};
	
});
