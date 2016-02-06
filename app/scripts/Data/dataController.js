app.controller('DataController', function(HomeService, baseFactory, DataFactory, $rootScope, Constants, $scope) {

	var vm = this;
	$rootScope.showCover = true;
	var searchParam = HomeService.getSearchParam();
	vm.selectedCategory = baseFactory.getSelectedCategory();
	vm.offset = null;
	$scope.pageSize = 5;
    $scope.currentPage = 1;

    vm.fetchData = function(){
    	if(vm.offset == null){
    		vm.offset = 1;
    	}
    	var searchRequestDTO = {
			searchType : vm.selectedCategory,
			searchString : searchParam,
			cityId : $rootScope.selectedCity,
			offset : vm.offset,
			limit:$scope.pageSize
		};
		DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data){
			vm.resultList = data.searchResponseDTOList;
			if(vm.offset == 1){
				vm.totalRecords = data.resultCount;
			}
			
		},function(error){
			console.log(error);
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

    vm.fetchData();
}); 