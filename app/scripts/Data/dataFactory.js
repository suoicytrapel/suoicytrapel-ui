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
        }),
        filters: $resource(Constants.API_HOST + '/fetch/filters', {},{
            loadFilters : {
                method: "POST",
                isArray: false,
                transformResponse: function(data, header) {
                    return angular.fromJson(data);
                } 
            }
        }),
        checkAvailability: $resource(Constants.API_HOST + '/checkAvailability', {},{
            submit : {
                method: "POST",
                isArray: false
            }
        })
        /*
        attachments: $resource(Constants.API_HOST + '/fetch/filters', {},{
                    fetchAttachments : {
                        method: "POST",
                        isArray: true,
                        transformResponse: function(data, header) {
                            return angular.fromJson(data);
                        } 
                    }
                })*/
        
    };
});