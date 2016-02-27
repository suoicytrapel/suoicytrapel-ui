app.controller('detailController', function($scope, $rootScope, $interval, baseFactory, $timeout, $location, HomeFactory, HomeService, dataService, DataFactory, Constants, $routeParams, $window) {
	var vm = this;
	vm.tabName = [];
	vm.tabData = [];
	vm.latitude = null;
	vm.longitude = null;

	vm.init = function(){
		$rootScope.showCover = false;
		vm.selectedCategory = baseFactory.getSelectedCategory();
		vm.name = $routeParams.searchParam;
		
	};
	vm.defineListeners =  function(){
		vm.openGallery = function(){
			$window.ga('send', 'event', 'View Gallery', 'File Name');
			$scope.$broadcast('showGallery');
		};
	};
	vm.fetchDetails = function(){
		var dataRequestDTO = {
			searchType : sessionStorage.selectedCategory || vm.selectedCategory,
			cityId : sessionStorage.selectedCityId,
			name : vm.name
		};
		DataFactory.fetchDetails.fetch(dataRequestDTO).$promise.then(function(data){
			vm.detailedData = data; 
			vm.latitude = vm.detailedData.latitude;
			vm.longitude = vm.detailedData.longitude;
			angular.forEach(vm.detailedData.tabMap, function(value, key) {
			  vm.tabName.push(key);
			  vm.tabData.push(value);
			});
			if(vm.detailedData && vm.detailedData.attachments && vm.detailedData.attachments.length > 0)
			vm.coverbgImageURL = baseFactory.getWebURL() + vm.detailedData.attachments[0].imageURL;
			dataService.setImageURLs(vm.detailedData.attachments);
			//$('#dataPopupModal').modal('toggle');
			//Broadcast load gallery event as soon as the images URL are available
			$scope.$broadcast('loadGallery',{'name': vm.name});
			//Applying Boxer on the menu images
			$('.boxer').boxer({
				fixed: true,
			});
			//google.maps.event.addDomListener(window, 'load', loadMap(28.012496, 73.336364));
			checkForMaps();
		},function(error){
			console.log(error);
		});
	};

	vm.fetchAttachments = function(){
		var dataRequestDTO = {
			searchType : vm.selectedCategory,
			cityId : $rootScope.selectedCity,
			name : vm.name
		};
		DataFactory.attachments.fetchAttachments(dataRequestDTO).$promise.then(function(data){
			vm.attachments = data.attachments;
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
    	var myCenter = new google.maps.LatLng(vm.latitude, vm.longitude);
    	var mapProp = {
        	center: myCenter,
        	zoom: 16,
        	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(angular.element('#map')[0], mapProp);

    var marker = new google.maps.Marker({
        position: myCenter,
    });

    marker.setMap(map);
	};

	vm.getImageURL = function(imagePath){
    	return baseFactory.getWebURL() + imagePath;
    };

    vm.getReccomendationDetails = function(name){
    	$window.ga('send', 'event', 'View Recommended Item', name, sessionStorage.selectedCategory);
    	//vm.name = name;
    	$location.path('/details/' + name);
    };

    vm.initializeData = function(){
    	vm.tabName = [];
		vm.tabData = [];
		vm.latitude = null;
		vm.longitude = null;
    };

	
	vm.init();
	vm.fetchDetails();
	vm.defineListeners();
	
});