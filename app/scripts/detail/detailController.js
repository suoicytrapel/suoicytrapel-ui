app.controller('detailController', function($scope, $rootScope, baseFactory, $timeout, $location, HomeFactory, HomeService) {
	var vm = this;
	vm.init = function(){
		$rootScope.showCover = false;
	};
	vm.defineListeners =  function(){
		vm.openGallery = function(){
			$scope.$broadcast('showGallery');
		};
	};
	
	vm.init();
	vm.defineListeners();
});