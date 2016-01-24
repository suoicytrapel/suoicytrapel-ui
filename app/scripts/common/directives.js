/**
 * @author Anku
 */

app.directive('sideRibbon', function() {
	return {
		restrict : 'EA',
		templateUrl : 'views/ribbon/ribbon.html',
		scope : {},
		link : function(scope, element, attrs) {
			//Redefining the categories for ribbon
			scope.categoryMap = {
				Venues : 'VENUES',
				Caterers : 'CATERERS',
				Decorators : 'DECORATORS',
				Photographers : 'PHOTOGRAPHERS',
				Rentals : 'RENTALS',
			};
			scope.ribbonOpened = false;
		},
	};
});
