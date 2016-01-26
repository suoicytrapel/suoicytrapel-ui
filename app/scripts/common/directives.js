/**
 * @author Anku
 */

app.directive('sideRibbon', function($timeout) {
	return {
		restrict : 'EA',
		templateUrl : 'views/ribbon/ribbon.html',
		scope : {
			categoryMap: "=",
			selectedCategory: "="
		},
		link : function(scope, element, attrs) {
			//Redefining the categories for ribbon			
			scope.ribbonOpened = false;
			scope.index = -1;
			//console.log("scope.categoryMap = " + scope.categoryMap);
			console.log("scope.selectedCategory = " + scope.selectedCategory);
			//console.log(typeof(scope.selectedCategory));
			
			scope.selectCategory = function(index){
				console.log('index ' + index);
				angular.element('.ribbon-tab:nth-child(' + (index + 1) + ')').addClass('active').siblings().removeClass('active');
			};
			
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
