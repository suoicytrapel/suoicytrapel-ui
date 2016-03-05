/**
 * @author Anku
 */

app.factory('baseFactory', function($location) {
	var baseFactory = {};
	baseFactory.selectedCity = '1';
	baseFactory.selectedCategory = 'VENUE';
	baseFactory.coverUrl = '/images/main_cover.jpg';
	baseFactory.mainCoverHeading = 'Making Moments Memorable';
	baseFactory.categoryMap = {

		Venues : 'VENUE',
		Caterers : 'CATERER',
		Decorators : 'DECORATOR',
		Photographers : 'PHOTOGRAPHER',
		Rentals : 'RENTAL'
	};
	baseFactory.ourPortfolioImageUrls = {
		'Happy-Birthday-Mrs-Kalra': {
		'EventCover': '/images/rkb1.jpg',
		'Happy Bithday Mrs Kalra Moment2': '/images/rkb2.jpg',
		'Happy Bithday Mrs Kalra Moment3': '/images/rkb3.jpg',
		'Happy Bithday Mrs Kalra Moment4': '/images/rkb4.jpg',
		'Happy Bithday Mrs Kalra Moment5': '/images/rkb5.jpg',	
},

'Gurmeet-Weds-Sravleen':{
		'EventCover': '/images/gws1.jpg',	
		'Gurmeet Weds Sravleen Moment2': '/images/gws2.jpg',
		'Gurmeet Weds Sravleen Moment3': '/images/gws3.jpg',
		'Gurmeet Weds Sravleen Moment4': '/images/gws4.jpg',
		'Gurmeet Weds Sravleen Moment5': '/images/gws5.jpg',
		'Gurmeet Weds Sravleen Moment6': '/images/gws6.jpg',
		
},
'Mehul-Weds-Uma':{
		'EventCover': '/images/mwu1.jpg',
		'Mehul Weds Uma Moment2': '/images/mwu2.jpg',
		'Mehul Weds Uma Moment3': '/images/mwu3.jpg',
		'Mehul Weds Uma Moment4': '/images/mwu4.jpg',
		
		'Mehul Weds Uma Moment5': '/images/mwu5.jpg',	
		'Mehul Weds Uma Moment6': '/images/mwu6.jpg',
},
'New-Year-Bash-2016':{
		'EventCover': '/images/nyb1.jpg',
		'New Year Bash 2016 Moment2': '/images/nyb2.jpg',
		'New Year Bash 2016 Moment3': '/images/nyb3.jpg',
		
		'New Year Bash 2016 Moment4': '/images/nyb4.jpg',
		'New Year Bash 2016 Moment5': '/images/nyb5.jpg',	
},

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
	
	baseFactory.setMainCoverHeading = function(coverHeading){
		switch(coverHeading) {
			case 'VENUE':
				baseFactory.mainCoverHeading = 'VENUES';
				break;
			case 'CATERER':
				baseFactory.mainCoverHeading = 'CATERERS';
				break;
			case 'DECORATOR':
				baseFactory.mainCoverHeading = 'DECORATORS';
				break;
			case 'PHOTOGRAPHER':
				baseFactory.mainCoverHeading = 'PHOTOGRAPHERS';
				break;
			case 'RENTAL':
				baseFactory.mainCoverHeading = 'RENTALS';
				break;
			default:
				baseFactory.mainCoverHeading = 'Making Moments Memorable';
				break;

		};
	};
	
	baseFactory.getMainCoverHeading = function(){
		return baseFactory.mainCoverHeading;
	};

	baseFactory.getWebURL = function() {
		var webHostURL = $location.$$protocol + '://' + $location.$$host + ':' + $location.$$port + '/images/';
		return webHostURL;
	};

	return baseFactory;
});
