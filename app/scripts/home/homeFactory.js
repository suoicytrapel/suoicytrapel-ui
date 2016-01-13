
var app = angular.module("leparticiousUiApp");


//inject the value in the controller using its name "defaultInput"
app.factory('HomeFactory', function ($resource) {
   
    return $resource('http://localhost:8080/api/rest/v1/user/:id', {id: "@id" }, {
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