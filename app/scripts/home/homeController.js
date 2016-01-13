var app = angular.module("leparticiousUiApp");


//inject the value in the controller using its name "defaultInput"
app.controller('HomeController', function (HomeFactory) {
   
   var vm = this;

   vm.homeFun = function (){
   	var obj = {
   		name:'abc',
   		value : 'def'
   	};
   	HomeFactory.query(obj, function(data) {
           console.log('data is:', data);
   	});
   }

});