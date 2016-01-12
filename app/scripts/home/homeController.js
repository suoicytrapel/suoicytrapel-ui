var app = angular.module("leparticiousUiApp");


//inject the value in the controller using its name "defaultInput"
app.controller('HomeController', function (HomeFactory) {
   
   var vm = this;

   vm.homeFun = function (){
   	HomeFactory.get(function(data) {
           console.log('data is:', data);
   	});
   }

});