app.controller('DataController', function(baseFactory, dataService, DataFactory, $rootScope, Constants, $scope, $location, filters, $routeParams) {

	var vm = this;
	$rootScope.showCover = true;
	baseFactory.setCoverUrl($routeParams.category);
	baseFactory.setMainCoverHeading($routeParams.category);
	vm.offset = null;
	$scope.pageSize = 6;
	$scope.currentPage = 1;
	vm.filters = filters;
	vm.showServiceFilters = false;
	vm.showEstablishmentFilters = true;
	vm.showAmenityFilters = false;
	vm.showLocalityFilters = true;
	vm.showRoomFilters = false;
	vm.showPriceFilters = false;
	vm.showRentalFilters = true;
	vm.showCarFilters = false;
	vm.showBandFilters = false;
	vm.showEventsFilters = true;
	vm.setFromRecord = null;
	vm.setToRecord = null;

	vm.fetchData = function(isFilterSearch) {
		vm.selectedFilters = {
			serviceList : [],
			localityList : [],
			amenityList : [],
			priceRangeList : [],
			roomList : [],
			estList : [],
			eventList : [],
			rentalList : []
		};
		if (vm.offset == null) {
			vm.offset = 1;
		}
		if (isFilterSearch) {
			vm.getSelectedFilters();
		}
		var searchRequestDTO = {
			searchType : $routeParams.category,
			searchString : $routeParams.searchParam,
			cityId : $routeParams.city,
			offset : vm.offset,
			limit : $scope.pageSize,
			filters : vm.selectedFilters
		};
		DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
			vm.resultList = data.searchResponseDTOList;
			vm.serviceList = data.services;
			if (vm.offset == 1) {
				vm.totalRecords = data.resultCount;
			}
			vm.setRecordNumber();
		}, function(error) {
			console.log(error);
			vm.resultList = [];
			vm.totalRecords = 0;
		});
	};

	vm.getImageURL = function(imagePath) {
		return baseFactory.getWebURL() + imagePath;
	};

	$scope.pageChangeHandler = function(newPageNumber) {
		$scope.currentPage = newPageNumber;
		vm.offset = newPageNumber;
		vm.fetchData();
	};

	vm.fetchDetails = function(name) {
		var searchParam = name;
		$location.path('/details/' + $routeParams.city +'/'+ $routeParams.category + '/' + searchParam);
	};

	vm.filterResults = function() {
		vm.offset = null;
		vm.fetchData(true);
	};

	vm.resetFilters = function() {
		for (var k in vm.filters.services) {
			vm.filters.services[k].checked = false;
		}
		for (var k in vm.filters.amenities) {
			vm.filters.amenities[k].checked = false;
		}
		for (var k in vm.filters.rooms) {
			vm.filters.rooms[k].checked = false;
		}
		for (var k in vm.filters.localities) {
			vm.filters.localities[k].checked = false;
		}
		for (var k in vm.filters.establishments) {
			vm.filters.establishments[k].checked = false;
		}
		for (var k in vm.filters.priceRange) {
			vm.filters.priceRange[k].checked = false;
		}
		for (var k in vm.filters.eventType) {
			vm.filters.eventType[k].checked = false;
		}
		for (var k in vm.filters.rentalType) {
			vm.filters.rentalType[k].checked = false;
		}
		vm.selectedFilters = {
			serviceList : [],
			localityList : [],
			amenityList : [],
			priceRangeList : [],
			roomList : [],
			estList : [],
			eventList : [],
			rentalList : []
		};
		vm.fetchData(false);
	};

	vm.getSelectedFilters = function() {
		for (var k in vm.filters.services) {
			if (vm.filters.services[k].checked) {
				vm.selectedFilters.serviceList.push(vm.filters.services[k].id);
			}
		}
		for (var k in vm.filters.amenities) {
			if (vm.filters.amenities[k].checked) {
				vm.selectedFilters.amenityList.push(vm.filters.amenities[k].id);
			}
		}
		for (var k in vm.filters.rooms) {
			if (vm.filters.rooms[k].checked) {
				vm.selectedFilters.roomList.push(vm.filters.rooms[k].id);
			}
		}
		for (var k in vm.filters.localities) {
			if (vm.filters.localities[k].checked) {
				vm.selectedFilters.localityList.push(vm.filters.localities[k].id);
			}
		}
		for (var k in vm.filters.establishments) {
			if (vm.filters.establishments[k].checked) {
				vm.selectedFilters.estList.push(vm.filters.establishments[k].id);
			}
		}
		for (var k in vm.filters.priceRange) {
			if (vm.filters.priceRange[k].checked) {
				vm.selectedFilters.priceRangeList.push(vm.filters.priceRange[k].id);
			}
		}
		for (var k in vm.filters.eventType) {
			if (vm.filters.eventType[k].checked) {
				vm.selectedFilters.eventList.push(vm.filters.eventType[k].id);
			}
		}
		for (var k in vm.filters.rentalType) {
			if (vm.filters.rentalType[k].checked) {
				vm.selectedFilters.rentalList.push(vm.filters.rentalType[k].id);
			}
		}
	};

	vm.setRecordNumber = function() {
		vm.setFromRecord = ($scope.currentPage - 1) * ($scope.pageSize) + 1;
		vm.setToRecord = ($scope.currentPage) * ($scope.pageSize);
		if (vm.setToRecord > vm.totalRecords) {
			vm.setToRecord = vm.totalRecords;
		}
	};

	vm.fetchData(false);

});
