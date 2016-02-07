app.controller('detailController', function($scope, $rootScope, baseFactory, $timeout, $location, HomeFactory, HomeService, dataService, DataFactory) {
	var vm = this;
	vm.init = function(){
		$rootScope.showCover = false;
		vm.selectedCategory = baseFactory.getSelectedCategory();
		vm.name = dataService.getName();
	};
	vm.defineListeners =  function(){
		vm.openGallery = function(){
			$scope.$broadcast('showGallery');
		};
	};
	vm.fetchDetails = function(){
		
		var dataRequestDTO = {
					searchType : vm.selectedCategory,
					cityId : $rootScope.selectedCity,
					name : vm.name
				};
				DataFactory.fetchDetails.fetch(dataRequestDTO).$promise.then(function(data){
					vm.detailedData = data;
					//$('#dataPopupModal').modal('toggle');
				},function(error){
					console.log(error);
				});
	};
	
	vm.init();
	vm.fetchDetails();
	vm.defineListeners();
	
});