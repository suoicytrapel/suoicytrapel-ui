/**
 * @author Anku
 * Defining variables and methods
 * accessible throughout the <body> tag  
 */

app.controller('baseController',function($scope, baseFactory){
	$scope.selectedCategory = baseFactory.getSelectedCategory();
	$scope.categoryMap = baseFactory.categoryMap;
});
