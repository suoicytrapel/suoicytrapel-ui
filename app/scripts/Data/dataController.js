app.controller('DataController', function(HomeService, baseFactory, DataFactory, $rootScope, Constants) {

	var vm = this;
	var searchParam = HomeService.getSearchParam();
	vm.selectedCategory = baseFactory.getSelectedCategory();
	vm.offset = null;
    console.log('Called', searchParam);

    vm.fetchData = function(){
    	if(vm.offset == null){
    		vm.offset = 1;
    	}
    	var searchRequestDTO = {
			searchType : vm.selectedCategory,
			searchString : searchParam,
			cityId : $rootScope.selectedCity,
			offset : vm.offset
		};
		DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data){
			vm.resultList = data.searchResponseDTOList;
			vm.resultCount = data.resultCount;
		},function(error){
			console.log(error);
		});
    };

    vm.getImageURL = function(imagePath){
    	return Constants.WEB_HOST + imagePath;
    };

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