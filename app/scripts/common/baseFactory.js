/**
 * @author Anku
 */

app.factory('baseFactory',function(){
	var baseFactory = {};
	baseFactory.selectedCity = '1';
	baseFactory.selectedCategory = 'VENUE';
	baseFactory.categoryMap = {

		Venues:'VENUE',
		Caterers:'CATERER',
		Decorators:'DECORATOR',
		Photographers:'PHOTOGRAPHER',
		Rentals:'RENTAL',
		Band:'BAND'
	};
	
	baseFactory.getSelectedCity = function(){
		return baseFactory.selectedCity;
	};
	
	baseFactory.setSelectedCity = function(index){
		baseFactory.selectedCity = index;
	};
	
	baseFactory.getSelectedCategory = function(){
		return baseFactory.selectedCategory;
	};
	
	baseFactory.setSelectedCategory = function(category){
		baseFactory.selectedCategory = category;
	};
	
	return baseFactory;
});
