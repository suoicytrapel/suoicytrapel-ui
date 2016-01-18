app.factory('HomeFactory', function (Constants, $resource) {
   
    return $resource(Constants.API_HOST + '/user/:id', {id: "@id" }, {
        saveUser: { 
        	method: "POST"
        },
         updateUser: { 
        	method: "PUT"
        },
         deleteUser: { 
        	method: "DELETE"
        },
         getUser: { 
        	method: "GET",
        	isArray: false,
    		transformResponse: function(data, header) {
					return angular.fromJson(data);
    		}
        },
         getAllUsers: { 
        	method: "GET"
        }
    });
});