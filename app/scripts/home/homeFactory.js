app.factory('HomeFactory', function (Constants, $resource) {

     return {
        loadList: $resource(Constants.API_HOST + '/search/populateList', {}, {
                    populate:{
                        method: "POST",
                        isArray: true,
                        transformResponse: function(data, header) {
                            return angular.fromJson(data);
                        }
                    }
                }),
        loadCities: $resource(Constants.API_HOST + '/search/city', {},{
            populateCities : {
                method: "GET",
                isArray: false,
                transformResponse: function(data, header) {
                    return angular.fromJson(data);
                },
              
            }
            }),
        fetchAdditions: $resource(Constants.API_HOST + '/search/city/recentAdditions', {},{
            recentAdditions : {
                method: "POST",
                isArray: false,
                transformResponse: function(data, header) {
                    return angular.fromJson(data);
                } 
            }
            }),
        fetchSubCategories: $resource(Constants.API_HOST + '/search/subCategories', {},{
            subCategories : {
                method: "GET",
                isArray: false,
                transformResponse: function(data, header) {
                    return angular.fromJson(data);
                } 
            }
            }),
        user: $resource(Constants.API_HOST + '/user/activate', {},{
            activate : {
                method: "GET",
                isArray: false,
                transformResponse: function(data, header) {
                    return angular.fromJson(data);
                } 
            }
            }),    
        };
});