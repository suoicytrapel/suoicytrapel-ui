/*var app = angular.module("leparticiousUiApp");*/

//inject the value in the controller using its name "defaultInput"
app.controller('HomeController', function(HomeFactory) {
	var vm = this;
	vm.selectedCategory = 'VENUES';
	vm.categoryMap = {
		Venues:'VENUES',
		Caterers:'CATERERS',
		Decorators:'DECORATORS',
		Photographers:'PHOTOGRAPHERS',
		Rentals:'RENTALS',
	};

	vm.init = function() {
		applyAutocomplete();
	};

	function applyAutocomplete() {
		angular.element('.home-search-box').autocomplete({

			//source : ['Ankit', 'Mohit', 'Ank', 'Moh', 'Anki', 'An', 'Akanksha', 'Akank'],
			
			//source to be used for making rest calls
			//the response data is to be passed to response method
			//data should be in array format
			source: function(request, response){
				//fetching the value in input tag of autocomplete
				console.log(request.term);
				var dummyData = ['Ankit', 'Mohit', 'Ank', 'Moh', 'Anki', 'An', 'Akanksha', 'Akank'];
				response(dummyData);
			}
		});
	}

	/*
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
	 var homeDTO = {
	 name:'abc',
	 value : 'def'
	 };*/

	/*
	 HomeFactory.updateUser(obj, function(data) {
	 console.log('data is:', data);
	 });
	 */

	/*
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
	 }*/
	/*

	 *
	 * Funciton for opening the select element on click of button
	 * */
	/*
	 vm.open = function(ele) {
	 var elem = $(ele);
	 if (document.createEvent) {
	 var e = document.createEvent("MouseEvents");
	 e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	 elem[0].dispatchEvent(e);
	 } else if (element.fireEvent) {
	 elem[0].fireEvent("onmousedown");
	 }
	 }*/
	
	/*Initializing*/
	vm.init();
}); 