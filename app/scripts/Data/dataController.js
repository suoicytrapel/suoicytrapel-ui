app.controller('DataController', function(baseFactory, dataService, DataFactory, $rootScope, Constants, $scope, $location, filters, $routeParams, initiallyFetchedRecords, $timeout) {

	var vm = this;
	$rootScope.showCover = true;
	baseFactory.setCoverUrl($routeParams.category);
	baseFactory.setMainCoverHeading($routeParams.category);
	baseFactory.setSelectedCategory($routeParams.category);
	baseFactory.setSelectedCity($routeParams.city);
	$scope.$emit('updateBaseControllerData', {
		routeParamsCity : $routeParams.city,
		routeParamsCategory : $routeParams.category
	});
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
	vm.showOtherFilters = true;
	vm.showEventsFilters = true;
	vm.setFromRecord = null;
	vm.setToRecord = null;
	vm.showMoreFilters = false;
	vm.smallScreen = false;
	vm.openFilterRibbon = false;
	
	vm.detectScreenSize = function(){
		var screenWidth = window.innerWidth;
		if(screenWidth < 768){
			vm.smallScreen = true;
		}
		else
		vm.smallScreen = false;
	};
	
		vm.detectScreenSize();

	vm.fetchData = function(isFilterSearch) {
		vm.selectedFilters = {
			serviceList : [],
			localityList : [],
			amenityList : [],
			priceRangeList : [],
			roomList : [],
			estList : [],
			eventList : [],
			rentalList : [],
			othersList : []
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

	/* Toggle Behavior method for each filter
	 * Every time a new filter is added
	 * a toggle behavior method is to be added
	 *  */
	vm.expandCollapseLocalitiesFilter = function() {
		vm.showLocalityFilters = !vm.showLocalityFilters;
		angular.element('#localitiesDiv').collapse('toggle');
	};

	vm.expandCollapseEventTypeFilter = function() {
		vm.showEventsFilters = !vm.showEventsFilters;
		angular.element('#eventTypeDiv').collapse('toggle');
	};

	vm.expandCollapseEstablishmentsFilter = function() {
		vm.showEstablishmentFilters = !vm.showEstablishmentFilters;
		angular.element('#establishmentsDiv').collapse('toggle');
	};

	vm.expandCollapseEntertainmentTypeFilter = function() {
		vm.showRentalFilters = !vm.showRentalFilters;
		angular.element('#entertainmentTypeDiv').collapse('toggle');
	};

	vm.expandCollapseOthersTypeFilter = function() {
		vm.showOtherFilters = !vm.showOtherFilters;
		angular.element('#othersTypeDiv').collapse('toggle');
	};

	vm.expandCollapseMoreFilter = function() {
		vm.showMoreFilters = !vm.showMoreFilters;
		angular.element('#moreFilterDiv').collapse('toggle');
	};

	vm.expandCollapseCarTypeFilter = function() {
		vm.showCarFilters = !vm.showCarFilters;
		angular.element('#carTypeDiv').collapse('toggle');
	};

	vm.expandCollapseBandTypeFilter = function() {
		vm.showBandFilters = !vm.showBandFilters;
		angular.element('#bandTypeDiv').collapse('toggle');
	};

	vm.expandCollapseAmenitiesFilter = function() {
		vm.showAmenityFilters = !vm.showAmenityFilters;
		angular.element('#amenitiesDiv').collapse('toggle');
	};

	vm.expandCollapseRoomsFilter = function() {
		vm.showRoomFilters = !vm.showRoomFilters;
		angular.element('#roomsDiv').collapse('toggle');
	};

	vm.expandCollapseServicesFilter = function() {
		vm.showServiceFilters = !vm.showServiceFilters;
		angular.element('#servicesDiv').collapse('toggle');
	};

	vm.expandCollapsePriceRangeFilter = function() {
		vm.showPriceFilters = !vm.showPriceFilters;
		angular.element('#priceRangeDiv').collapse('toggle');
	};

	$scope.pageChangeHandler = function(newPageNumber) {
		$scope.currentPage = newPageNumber;
		vm.offset = newPageNumber;
		vm.fetchData();
	};

	vm.fetchDetails = function(name) {
		var searchParam = name;
		$location.path('/details/' + $routeParams.city + '/' + $routeParams.category + '/' + searchParam);
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
		for (var k in vm.filters.entertainmentType) {
			vm.filters.entertainmentType[k].checked = false;
		}
		for (var k in vm.filters.othersType) {
			vm.filters.othersType[k].checked = false;
		}
		vm.selectedFilters = {
			serviceList : [],
			localityList : [],
			amenityList : [],
			priceRangeList : [],
			roomList : [],
			estList : [],
			eventList : [],
			rentalList : [],
			othersList : []
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
		for (var k in vm.filters.entertainmentType) {
			if (vm.filters.entertainmentType[k].checked) {
				vm.selectedFilters.rentalList.push(vm.filters.entertainmentType[k].id);
			}
		}
		for (var k in vm.filters.othersType) {
			if (vm.filters.othersType[k].checked) {
				vm.selectedFilters.othersList.push(vm.filters.othersType[k].id);
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

	vm.emitPageDataPopulated = function() {

		$scope.$emit('pageDataPopulated');
	};

	//vm.fetchData(false);
	/* Populated data based on call written in resolve block */
	if (initiallyFetchedRecords && !(initiallyFetchedRecords.errorCode)) {
		vm.resultList = initiallyFetchedRecords.searchResponseDTOList;
		vm.serviceList = initiallyFetchedRecords.services;
		vm.totalRecords = initiallyFetchedRecords.resultCount;
		vm.setRecordNumber();
	} else {
		console.log(initiallyFetchedRecords.data.errorCode);
		vm.resultList = [];
		vm.totalRecords = 0;
	}

	function attachCollapsibleBehavToFilters() {
		$timeout(function() {
			if (vm.filters && typeof vm.filters == 'object') {
				for (var k in vm.filters) {
					angular.element('#' + k + 'Div').collapse({
						toggle : false,
					});
				}

				angular.element('#moreFilterDiv').collapse({
					toggle : false,
				});
			}
		});
	}

	attachCollapsibleBehavToFilters();
	vm.emitPageDataPopulated();

});
