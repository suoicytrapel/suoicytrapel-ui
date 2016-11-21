'use strict';

/**
 * @ngdoc overview
 * @name leparticiousUiApp
 * @description
 * # leparticiousUiApp
 *
 * Main module of the application.
 */
var app = angular
  .module('leparticiousUiApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'angularUtils.directives.dirPagination',
    'ui.router',
    'angularSpinner',
    'angularModalService',
    '720kb.datepicker',
    'ngMaterial',
    'ngRating',
    'angular-storage',
    'rx',
    'leparticiousWizard'
  ])
  
app.config(['usSpinnerConfigProvider', 'storeProvider', function (usSpinnerConfigProvider, storeProvider) {
    /*usSpinnerConfigProvider.setDefaults({
    	color: 'rgb(243, 114, 84)',
    	length: 0,
    	width: 10,
    	radius: 25,
    	lines: 15
    	
    	});*/
    	
    	    // Store defaults to localStorage but we can set sessionStorage or cookieStorage.
    storeProvider.setStore('sessionStorage');
}]).run(function(userDetailsStore, loginStatusService, $timeout){
	if(userDetailsStore.getLoggedInUserDetails() && userDetailsStore.getLoggedInUserDetails().email){
	$timeout(function(){
		loginStatusService.getSubjectToSubscribe().onNext({
                        isLoggedIn : true,
                    });
                 },500);
                   }
}); 
  