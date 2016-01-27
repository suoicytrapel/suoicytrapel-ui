app.factory('DataFactory', function (Constants, $resource) {

     return {
        fetchData: $resource(Constants.API_HOST + '/fetch', {}, {
            fetch:{
                method: "POST",
                isArray: false,
                transformResponse: function(data, header) {
                    return angular.fromJson(data);
                }
            }
        }),
        fetchDetails: $resource(Constants.API_HOST + '/fetch/details', {},{
            fetch : {
                method: "POST",
                isArray: false,
                transformResponse: function(data, header) {
                    return angular.fromJson(data);
                } 
            }
            })
        };
});