var app = angular.module("leparticiousUiApp");


//inject the value in the controller using its name "defaultInput"
app.controller('HomeController', function (HomeFactory) {
   
   var vm = this;

   vm.saveUser = function (){
   	var obj = {
   		name:'abc',
   		value : 'def'
   	};
   	HomeFactory.saveUser(obj, function(data) {
           console.log('data is:', data);
   	});
   }

   vm.updateUser = function (){
   	var obj = {
   		name:'abc',
   		value : 'def'
   	};
   	HomeFactory.updateUser(obj, function(data) {
           console.log('data is:', data);
   	});
   }

   vm.deleteUser = function (){
   	var id = 3;
   	HomeFactory.deleteUser({}, {'id': id}, function(data) {
           console.log('data is:', data);
   	});
   }

   vm.getUser = function (){
   	var id = 1;
   	HomeFactory.getUser({}, {'id': id}, function(data) {
           console.log('data is:', data.name);
   	});
   }

   vm.getAllUsers = function (){
   	HomeFactory.getAllUsers(function(data) {
           console.log('data is:', data);
   	});
   }

});