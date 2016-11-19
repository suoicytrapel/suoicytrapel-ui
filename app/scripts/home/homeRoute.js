app.config(['$routeProvider', '$httpProvider', '$locationProvider', '$mdThemingProvider',
function($routeProvider, $httpProvider, $locationProvider, $mdThemingProvider) {
	
	$mdThemingProvider.theme('default')
    .primaryPalette('deep-orange')
    .accentPalette('green');

	$routeProvider.when('/', {
		url : '/login',
		controller : 'HomeController',
		templateUrl : 'views/home/home.html',
		controllerAs : 'vm',
		resolve : {
			changeCover : function(baseFactory) {
				baseFactory.setMainCoverHeading('Your Online Event Planner');
			},
			recentAdditions : function(baseFactory, HomeFactory, $location) {
				/*var cityId = baseFactory.getSelectedCity();
				return HomeFactory.fetchAdditions.recentAdditions(cityId).$promise.then(function(data) {
					return data;

				}, function(error) {
					$location.path('/bad-request/');
				});*/
				return null;
			},
			subCategories : function(baseFactory, HomeFactory, $location) {
				return HomeFactory.fetchSubCategories.subCategories().$promise.then(function(data) {
					return data;

				}, function(error) {
					$location.path('/bad-request/');
				});
			},
			activateAccount: function($location, HomeFactory){
				if($location.search().activateAccount){
					HomeFactory.account.activate($location.search().activateAccount).$promise.then(function(data){
						return 'Success';
					}, function(error){
						return 'Error';
					});
				}
				else
				return null;
			}
		}
	}).when('/vendors/:city/:category/:searchParam', {
		url : '/search',
		controller : 'DataController',
		templateUrl : 'views/data/data.html',
		controllerAs : 'vm',
		resolve : {
			
			/*
			response : function(DataFactory, baseFactory, $rootScope, $route, $location) {
							var selectedCategory = $route.current.params.category;
							
							var filterRequestDTO = {
								searchType : selectedCategory,
								cityId : $route.current.params.city,
							};
							return DataFactory.filters.loadFilters(filterRequestDTO).$promise.then(function(data) {
								
								return data.toJSON();
							}, function(error) {
								$location.path('/bad-request/');
							});
						},
						initiallyFetchedRecords : function(DataFactory, $route, $location) {
							var pageSize = 6;
							var offset = 1;
							
							var selectedFilters = {
								serviceList : [],
								localityList : [],
								amenityList : [],
								priceRangeList : [],
								roomList : [],
								estList : [],
								eventList : [],
								rentalList : [],
								othersList : [],
								catererTypeList : [],
								photographerTypeList : []
							};
							var searchRequestDTO = {
								searchType : $route.current.params.category,
								searchString : $route.current.params.searchParam,
								cityId : $route.current.params.city,
								offset : offset,
								limit : pageSize,
								filters : selectedFilters
							};
			
							return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
								return data;
							}, function(error) {
								$location.path('/bad-request/');
							});
						}*/
			response : function(DataFactory, baseFactory, $rootScope, $route, $location) {
				var response = {};
				var selectedCategory = $route.current.params.category;
				var pageSize = 6;
				var offset = 1;
				
				var selectedFilters = {
					serviceList : [],
					localityList : [],
					amenityList : [],
					priceRangeList : [],
					roomList : [],
					estList : [],
					eventList : [],
					rentalList : [],
					othersList : [],
					catererTypeList : [],
					photographerTypeList : []
				};
				var searchRequestDTO = {
					searchType : $route.current.params.category,
					searchString : $route.current.params.searchParam,
					cityId : $route.current.params.city,
					offset : offset,
					limit : pageSize,
					filters : selectedFilters
				};
				var filterRequestDTO = {
					searchType : selectedCategory,
					cityId : $route.current.params.city,
				};
				return DataFactory.filters.loadFilters(filterRequestDTO).$promise.then(function(data) {
					var selectedFilterName = DataFactory.getSelectedFilterName();
					if(selectedFilterName != null){
						if(selectedCategory == 'VENUE'){
							for (var k in data.establishments) {
								if(selectedFilterName == data.establishments[k].name){
									data.establishments[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.estList.push(data.establishments[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
						else if(selectedCategory == 'OTHERS'){
							for (var k in data.othersType) {
								if(selectedFilterName == data.othersType[k].name){
									data.othersType[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.othersList.push(data.othersType[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
						else if(selectedCategory == 'CATERER'){
							for (var k in data.catererType) {
								if(selectedFilterName == data.catererType[k].name){
									data.catererType[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.catererTypeList.push(data.catererType[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
						else if(selectedCategory == 'DECORATOR'){
							for (var k in data.services) {
								if(selectedFilterName == data.services[k].name){
									data.services[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.serviceList.push(data.services[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
						else if(selectedCategory == 'PHOTOGRAPHER'){
							for (var k in data.photographerType) {
								if(selectedFilterName == data.photographerType[k].name){
									data.photographerType[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.photographerTypeList.push(data.photographerType[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
						else if(selectedCategory == 'ENTERTAINMENT'){
							for (var k in data.entertainmentType) {
								if(selectedFilterName == data.entertainmentType[k].name){
									data.entertainmentType[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.rentalList.push(data.entertainmentType[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
					}
					else{
						response.filters = data.toJSON();
						return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
							response.initiallyFetchedRecords = data;
							return response;
						}, function(error) {
							$location.path('/bad-request/');
						});
					}
				}, function(error) {
					$location.path('/bad-request/');
				});
			}
		}
	}).when('/vendors/:city/:category', {
		url : '/search',
		controller : 'DataController',
		templateUrl : 'views/data/data.html',
		controllerAs : 'vm',
		resolve : {
			response : function(DataFactory, baseFactory, $rootScope, $route, $location) {
				var response = {};
				var selectedCategory = $route.current.params.category;
				var pageSize = 6;
				var offset = 1;
				
				var selectedFilters = {
					serviceList : [],
					localityList : [],
					amenityList : [],
					priceRangeList : [],
					roomList : [],
					estList : [],
					eventList : [],
					rentalList : [],
					othersList : [],
					catererTypeList : [],
					photographerTypeList : []
				};
				var searchRequestDTO = {
					searchType : $route.current.params.category,
					searchString : $route.current.params.searchParam,
					cityId : $route.current.params.city,
					offset : offset,
					limit : pageSize,
					filters : selectedFilters
				};
				var filterRequestDTO = {
					searchType : selectedCategory,
					cityId : $route.current.params.city,
				};
				return DataFactory.filters.loadFilters(filterRequestDTO).$promise.then(function(data) {
					var selectedFilterName = DataFactory.getSelectedFilterName();
					if(selectedFilterName != null){
						if(selectedCategory == 'VENUE'){
							for (var k in data.establishments) {
								if(selectedFilterName == data.establishments[k].name){
									data.establishments[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.estList.push(data.establishments[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
						else if(selectedCategory == 'OTHERS'){
							for (var k in data.othersType) {
								if(selectedFilterName == data.othersType[k].name){
									data.othersType[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.othersList.push(data.othersType[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
						else if(selectedCategory == 'CATERER'){
							for (var k in data.catererType) {
								if(selectedFilterName == data.catererType[k].name){
									data.catererType[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.catererTypeList.push(data.catererType[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
						else if(selectedCategory == 'DECORATOR'){
							for (var k in data.services) {
								if(selectedFilterName == data.services[k].name){
									data.services[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.serviceList.push(data.services[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
						else if(selectedCategory == 'PHOTOGRAPHER'){
							for (var k in data.photographerType) {
								if(selectedFilterName == data.photographerType[k].name){
									data.photographerType[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.photographerTypeList.push(data.photographerType[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
						else if(selectedCategory == 'ENTERTAINMENT'){
							for (var k in data.entertainmentType) {
								if(selectedFilterName == data.entertainmentType[k].name){
									data.entertainmentType[k].checked = true;
									response.filters = data.toJSON();
									searchRequestDTO.filters.rentalList.push(data.entertainmentType[k].id);
									return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
										DataFactory.setSelectedFilterName(null);
										response.initiallyFetchedRecords = data;
										return response;
									}, function(error) {
										$location.path('/bad-request/');
									});
									break;
								}
									
							}
						}
					}
					else{
						response.filters = data.toJSON();
						return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
							response.initiallyFetchedRecords = data;
							return response;
						}, function(error) {
							$location.path('/bad-request/');
						});
					}
				}, function(error) {
					$location.path('/bad-request/');
				});
			}/*,
			initiallyFetchedRecords : function(DataFactory, $route, $location) {
				var pageSize = 6;
				var offset = 1;
				var selectedFilters = DataFactory.getSelectedFilters();
				var searchRequestDTO = {
					searchType : $route.current.params.category,
					searchString : $route.current.params.searchParam,
					cityId : $route.current.params.city,
					offset : offset,
					limit : pageSize,
					filters : selectedFilters
				};

				return DataFactory.fetchData.fetch(searchRequestDTO).$promise.then(function(data) {
					return data;
				}, function(error) {
					$location.path('/bad-request/');
				});
			}*/
		}
	}).when('/details/:city/:category/:searchParam', {
		url : '/details',
		controller : 'detailController',
		templateUrl : 'views/detail/detail.html',
		controllerAs : 'vm',
		resolve : {
			details : function(DataFactory, $route, $location) {
				var dataRequestDTO = {
					searchType : $route.current.params.category,
					cityId : $route.current.params.city,
					name : $route.current.params.searchParam,
				};
				return DataFactory.fetchDetails.fetch(dataRequestDTO).$promise.then(function(data) {
					return data;
				}, function(error) {
					$location.path('/bad-request/');
				});
			}
			
		}
	}).when('/aboutus/', {
		url : '/aboutus',
		controller : '',
		templateUrl : 'views/about/about.html',
		resolve : {
			hideCover : function($rootScope) {
				$rootScope.showCover = false;
			}
		}
	}).when('/faq/', {
		url : '/faq',
		controller : '',
		templateUrl : 'views/faq/faq.html',
		resolve : {
			hideCover : function($rootScope) {
				$rootScope.showCover = false;
			}
		}
	}).when('/disclaimer/', {
		url : '/disclaimer',
		controller : '',
		templateUrl : 'views/disclaimer/disclaimer.html',
		resolve : {
			hideCover : function($rootScope) {
				$rootScope.showCover = false;
			}
		}
	}).when('/privacy-policy/', {
		url : '/privacy-policy',
		controller : '',
		templateUrl : 'views/privacypolicy/privacypolicy.html',
		resolve : {
			hideCover : function($rootScope) {
				$rootScope.showCover = false;
			}
		}
	}).when('/terms-of-use/', {
		url : '/terms-of-use',
		controller : '',
		templateUrl : 'views/termsofuse/termsofuse.html',
		resolve : {
			hideCover : function($rootScope) {
				$rootScope.showCover = false;
			}
		}
	}).when('/wizard/', {
		url : '/ahjgkdvko78nhss4fkn5jsdfsdkk2dsdfssd',
		controller : 'wizardController',
		controllerAs: 'vm',
		templateUrl : 'lp_wizard/views/venue_wizard/venue_wizard.html',
		resolve : {
			hideCover : function($rootScope) {
				$rootScope.showCover = false;
			}
		}
	});

	$locationProvider.html5Mode(true);

}]);
