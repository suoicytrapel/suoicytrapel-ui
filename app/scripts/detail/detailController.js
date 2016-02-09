app.controller('detailController', function($scope, $rootScope, $interval, baseFactory, $timeout, $location, HomeFactory, HomeService, dataService, DataFactory) {
	var vm = this;
	vm.init = function(){
		$rootScope.showCover = false;
		vm.selectedCategory = baseFactory.getSelectedCategory();
		vm.name = dataService.getName();
		//google.maps.event.addDomListener(window, 'load', loadMap(28.012496, 73.336364));
		checkForMaps();
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
	
	function checkForMaps(){
		var interval = setInterval(function(){
			if (typeof google === 'object' && typeof google.maps === 'object') {
        loadMap();
        clearInterval(interval);
    } 
  },100);
	}
	
	function loadMap() {
    	var myCenter = new google.maps.LatLng(28.012496, 73.336364);
    	var mapProp = {
        	center: myCenter,
        	zoom: 8,
        	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(angular.element('#map')[0], mapProp);

    var marker = new google.maps.Marker({
        position: myCenter,
    });

    marker.setMap(map);
}

	
	vm.init();
	vm.fetchDetails();
	vm.defineListeners();
	
});