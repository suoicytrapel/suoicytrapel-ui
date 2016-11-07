app.factory('DataFactory', function (Constants, $resource) {
    var filterName = null;
    var selectedFilter = null;

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
        }),
        getSelectedFilterName : function() {
            return this.filterName;
        },

        setSelectedFilterName : function(filterName) {
            this.filterName = filterName;
        },
        getSelectedFilters : function() {
            return this.selectedFilter;
        },

        setSelectedFilters : function(selectedFilter) {
            this.selectedFilter = selectedFilter;
        }
        
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