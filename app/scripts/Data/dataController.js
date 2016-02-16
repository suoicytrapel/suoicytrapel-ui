app.controller('DataController', function(HomeService, baseFactory, dataService, DataFactory, $rootScope, Constants, $scope, $location, filters) {

	var vm = this;
	$rootScope.showCover = true;
	vm.searchParam = HomeService.getSearchParam();
	vm.selectedCategory = baseFactory.getSelectedCategory();
	vm.offset = null;
	$scope.pageSize = 6;
  $scope.currentPage = 1;
  vm.filters = filters;
  vm.showServiceFilters = false;
  vm.showEstablishmentFilters = true;
  vm.showAmenityFilters = false;
  vm.showLocalityFilters = true;
  vm.showRoomFilters = false; 
  vm.setFromRecord = null;
  vm.setToRecord = null;
      
    vm.fetchData = function(isFilterSearch){
    	vm.selectedFilters = [];
    	if(vm.offset == null){
    		vm.offset = 1;
    	}
      if(isFilterSearch){
        vm.getSelectedFilters();
      }
    	var searchRequestDTO = {
  			searchType : vm.selectedCategory,
  			searchString : vm.searchParam,
  			cityId : $rootScope.selectedCity,
  			offset : vm.offset,
  			limit:$scope.pageSize,
  			filters:vm.selectedFilters
  		};
		  DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data){
  			vm.resultList = data.searchResponseDTOList;
  			vm.serviceList = data.services;
  			if(vm.offset == 1){
  				vm.totalRecords = data.resultCount;
  			}
        vm.setRecordNumber();
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
    };



    vm.fetchDetails = function(name){
      var searchParam = name;
  		$location.path('/details/' + searchParam);		
    };


   	vm.filterResults = function(){
	   	vm.offset = null;
	   	vm.fetchData(true);
   	};

   	vm.resetFilters = function(){
   		for(var k in vm.filters.services){
   			vm.filters.services[k].checked = false;
   		}
   		for(var k in vm.filters.amenities){
   			vm.filters.amenities[k].checked = false;
   		}
   		for(var k in vm.filters.rooms){
   			vm.filters.rooms[k].checked = false;
   		}
   		for(var k in vm.filters.localities){
   			vm.filters.localities[k].checked = false;
   		}
      for(var k in vm.filters.establishments){
        vm.filters.establishments[k].checked = false;
      }
      vm.selectedFilters = [];
      vm.fetchData(false);
   	};

   	vm.getSelectedFilters = function(){
   		for(var k in vm.filters.services){
   			if(vm.filters.services[k].checked){
   				vm.selectedFilters.push(vm.filters.services[k].type);
   			}
   		}
   		for(var k in vm.filters.amenities){
   			if(vm.filters.amenities[k].checked){
   				vm.selectedFilters.push(vm.filters.amenities[k].type);
   			}
   		}
   		for(var k in vm.filters.rooms){
   			if(vm.filters.rooms[k].checked){
   				vm.selectedFilters.push(vm.filters.rooms[k].type);
   			}
   		}
   		for(var k in vm.filters.localities){
   			if(vm.filters.localities[k].checked){
   				vm.selectedFilters.push(vm.filters.localities[k].name);
   			}
   		}
      for(var k in vm.filters.establishments){
        if(vm.filters.establishments[k].checked){
          vm.selectedFilters.push(vm.filters.establishments[k].type);
        }
      }
   	};

    vm.setRecordNumber = function(){
      vm.setFromRecord = ($scope.currentPage - 1) * ($scope.pageSize) + 1;
      vm.setToRecord = ($scope.currentPage) * ($scope.pageSize);
      if(vm.setToRecord > vm.totalRecords){
        vm.setToRecord = vm.totalRecords;
      }
    };

   	vm.fetchData(false);

}); 