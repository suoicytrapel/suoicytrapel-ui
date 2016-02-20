/**
 * @author Anku
 */

app.factory('baseFactory', function($location) {
	var baseFactory = {};
	baseFactory.selectedCity = '1';
	baseFactory.selectedCategory = 'VENUE';
	baseFactory.coverUrl = '/images/main_cover.jpg';
	baseFactory.categoryMap = {

		Venues : 'VENUE',
		Caterers : 'CATERER',
		Decorators : 'DECORATOR',
		Photographers : 'PHOTOGRAPHER',
		Rentals : 'RENTAL',
		Band : 'BAND'
	};

	baseFactory.getSelectedCity = function() {
		return baseFactory.selectedCity;
	};

	baseFactory.setSelectedCity = function(index) {
		baseFactory.selectedCity = index;
	};

	baseFactory.getSelectedCategory = function() {
		return baseFactory.selectedCategory;
	};

	baseFactory.setSelectedCategory = function(category) {
		baseFactory.selectedCategory = category;
	};

	baseFactory.setCoverUrl = function(category) {
		switch(category) {
			case 'VENUE':
				baseFactory.coverUrl = '/images/venues_cover.jpg';
				break;
			case 'CATERER':
				baseFactory.coverUrl = '/images/caterer_cover.jpg';
				break;
			case 'DECORATOR':
				baseFactory.coverUrl = '/images/decor_cover.jpg';
				break;
			case 'PHOTOGRAPHER':
				baseFactory.coverUrl = '/images/photography_cover.jpg';
				break;
			case 'RENTAL':
				baseFactory.coverUrl = '/images/rentals_cover.jpg';
				break;
			default:
				baseFactory.coverUrl = '/images/main_cover.jpg';
				break;

		};
		
	};
	
	baseFactory.getCoverUrl = function(){
		return baseFactory.coverUrl;
	};

	baseFactory.getWebURL = function() {
		var webHostURL = $location.$$protocol + '://' + $location.$$host + ':' + $location.$$port + '/images/';
		return webHostURL;
	};

	return baseFactory;
});
