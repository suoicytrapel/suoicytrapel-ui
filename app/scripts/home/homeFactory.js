
var app = angular.module("leparticiousUiApp");


//inject the value in the controller using its name "defaultInput"
app.factory('HomeFactory', function ($resource) {
   
    return $resource('http://localhost:8080/api/v1/rest/user', {}, {
            query: { method: "GET", isArray: true, headers: { 'Access-Control-Allow-Origin' : '*' }},
            create: { method: "POST"},
            get: { method: "GET",  headers: { 'Access-Control-Allow-Origin' : '*' }},
            remove: { method: "DELETE"},
            update: { method: "PUT"}
        });

});