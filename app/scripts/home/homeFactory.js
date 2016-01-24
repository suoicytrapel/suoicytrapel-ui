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
                } 
            }
            })
        };
});