app.config(['$routeProvider', '$httpProvider', '$locationProvider',
function($routeProvider, $httpProvider, $locationProvider) {

	$routeProvider.when('/', {
		url : '/login',
		controller : 'HomeController',
		templateUrl : 'views/home/home.html',
		controllerAs : 'vm',
		resolve : {
			changeCover : function(baseFactory) {
				baseFactory.setMainCoverHeading('Bringing Smiles on Faces');
			},
			recentAdditions : function(baseFactory, HomeFactory) {
				var cityId = baseFactory.getSelectedCity();
				return HomeFactory.fetchAdditions.recentAdditions(cityId).$promise.then(function(data) {
					return data;

				}, function(error) {
					return error;
				});
			}
		}
	}).when('/vendors/:city/:category/:searchParam', {
		url : '/search',
		controller : 'DataController',
		templateUrl : 'views/data/data.html',
		controllerAs : 'vm',
		resolve : {
			filters : function(DataFactory, baseFactory, $rootScope, $route) {
				var filterRequestDTO = {
					searchType : $route.current.params.category,
					cityId : $route.current.params.city,
				};
				return DataFactory.filters.loadFilters(filterRequestDTO).$promise.then(function(data) {
					return data.toJSON();
				}, function(error) {
					return error;
				});
			},
			initiallyFetchedRecords : function(DataFactory, $route) {
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
					othersList : []
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
					return error;
				});
			}
		}
	}).when('/vendors/:city/:category', {
		url : '/search',
		controller : 'DataController',
		templateUrl : 'views/data/data.html',
		controllerAs : 'vm',
		resolve : {
			filters : function(DataFactory, baseFactory, $rootScope, $route) {
				var filterRequestDTO = {
					searchType : $route.current.params.category,
					cityId : $route.current.params.city,
				};
				return DataFactory.filters.loadFilters(filterRequestDTO).$promise.then(function(data) {
					return data.toJSON();
				}, function(error) {
					return error;
				});
			},
			initiallyFetchedRecords : function(DataFactory, $route) {
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
					othersList : []
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
					return error;
				});
			}
		}
	}).when('/details/:city/:category/:searchParam', {
		url : '/details',
		controller : 'detailController',
		templateUrl : 'views/detail/detail.html',
		controllerAs : 'vm',
		resolve : {
			details : function(DataFactory, $route) {
				var dataRequestDTO = {
					searchType : $route.current.params.category,
					cityId : $route.current.params.city,
					name : $route.current.params.searchParam,
				};
				return DataFactory.fetchDetails.fetch(dataRequestDTO).$promise.then(function(data) {
					return data;
				}, function(error) {
					return error;
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
	}).otherwise({
		redirectTo : '/'
	});

	$locationProvider.html5Mode(true);

}]);
