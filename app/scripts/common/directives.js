/**
 * @author Anku
 */

app.directive('sideRibbon', function($timeout) {
	return {
		restrict : 'EA',
		templateUrl : 'views/ribbon/ribbon.html',
		/*
		scope : {
					categoryMap: "=",
					selectedCategory: "="
				},*/
		
		link : function(scope, element, attrs) {
			//console.log(scope);
			//Redefining the categories for ribbon			
			scope.ribbonOpened = false;
			scope.index = -1;
			console.log("scope.selectedCategory = " + scope.selectedCategory);

			
			scope.selectCategory = function(index){
				console.log('index ' + index);
				angular.element('.ribbon-tab:nth-child(' + (index + 1) + ')').addClass('active').siblings().removeClass('active');
			};
			
			scope.$watch(function(scope){
				return scope.selectedCategory
				},function(newValue, oldValue){
				console.log('newValue : ' + newValue + '  oldValue : ' + oldValue);
			});
			
			for(var category in scope.categoryMap){
				scope.index += 1;
				if(scope.categoryMap[category] == scope.selectedCategory){
				$timeout(function(){
					scope.selectCategory(scope.index);
				});
				break;
				}
			}
						
		},
	};
});
