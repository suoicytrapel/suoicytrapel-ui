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
    'ngMaterial'
  ])
  
app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({
    	color: 'rgb(243, 114, 84)',
    	length: 0,
    	width: 10,
    	radius: 25,
    	lines: 15
    	
    	});
}]); 
  