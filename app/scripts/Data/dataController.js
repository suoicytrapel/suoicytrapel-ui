app.controller('DataController', function(HomeService, baseFactory, DataFactory, $rootScope, Constants, $scope) {

	var vm = this;
	$rootScope.showCover = true;
	var searchParam = HomeService.getSearchParam();
	vm.selectedCategory = baseFactory.getSelectedCategory();
	vm.offset = null;
	$scope.pageSize = 5;
    $scope.currentPage = 1;
    vm.filters = [];
    

    vm.fetchData = function(){
    	vm.selectedFilters = [];
    	if(vm.offset == null){
    		vm.offset = 1;
    	}
    	if(vm.filters.length != 0){
    		for(var k in vm.filters){
    			var selectedFilter = vm.filters[k];
    			if(selectedFilter.checked){
    				vm.selectedFilters.push(selectedFilter.name);
    			}
    		}
    	}
    	var searchRequestDTO = {
			searchType : vm.selectedCategory,
			searchString : searchParam,
			cityId : $rootScope.selectedCity,
			offset : vm.offset,
			limit:$scope.pageSize,
			filters:vm.selectedFilters
		};
		DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data){
			vm.resultList = data.searchResponseDTOList;
			vm.serviceList = data.services;
			if(vm.filters.length == 0){
				for(var k in vm.serviceList){
					service = vm.serviceList[k];
					var filter = {
						name:service,
						type:'service'
					};
					vm.filters.push(filter);
				}
				vm.amenityList = data.amenities;
				for(var k in vm.amenityList){
					amenity = vm.amenityList[k];
					var filter = {
						name:amenity,
						type:'amenity'
					};
					vm.filters.push(filter);
				}
			}
			
			if(vm.offset == 1){
				vm.totalRecords = data.resultCount;
			}
			
		},function(error){
			console.log(error);
			vm.resultList = [];
			vm.totalRecords = 0;
		});
    };

    vm.getImageURL = function(imagePath){
    	return Constants.WEB_HOST + imagePath;
    };

    $scope.pageChangeHandler = function(newPageNumber){
    	$scope.currentPage = newPageNumber;
    	vm.offset = newPageNumber;
    	vm.fetchData();
    }

    vm.fetchDetails = function(name){
    	var dataRequestDTO = {
			searchType : vm.selectedCategory,
			cityId : $rootScope.selectedCity,
			name : name
		};
		DataFactory.fetchDetails.fetch(dataRequestDTO).$promise.then(function(data){
			vm.detailedData = data;
			$('#dataPopupModal').modal('toggle');
		},function(error){
			console.log(error);
		});
    };


   	vm.filterResults = function(){
	   	vm.offset = null;
	   	vm.fetchData();
   	};

   	vm.resetFilters = function(){
   		for(var k in vm.filters){
   			vm.filters[k].checked = false;
   		}
   	};

    vm.fetchData();
}); 