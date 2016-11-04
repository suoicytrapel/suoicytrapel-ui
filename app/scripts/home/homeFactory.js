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
                headers: { 
                	'Content-Type': 'application/json; charset=utf-8',
                	'Authorization': 'BEARER xxxxxxxxxxxxx'} 
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
            })
        };
});