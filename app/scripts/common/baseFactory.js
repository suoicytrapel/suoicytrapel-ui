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
		'birthdayparty': {
		'coverImage': '/images/rkb1.jpg',
		'helpText1': '/images/rkb2.jpg',
		'helpText2': '/images/rkb3.jpg',
		'helpText3': '/images/rkb4.jpg',
		'helpText4': '/images/rkb5.jpg',	
},

'gurmeetwedssravleen':{
		'coverImage': '/images/gws1.jpg',	
		'helpText': '/images/gws2.jpg',
		'helpText1': '/images/gws3.jpg',
		'helpText2': '/images/gws4.jpg',
		'helpText3': '/images/gws5.jpg',
		'helpText3': '/images/gws6.jpg',
		
},
'mehulwedsuma':{
		'coverImage': '/images/mwu1.jpg',
		'helpText': '/images/mwu2.jpg',
		'helpText1': '/images/mwu3.jpg',
		'helpText2': '/images/mwu4.jpg',
		
		'helpText4': '/images/mwu5.jpg',	
		'helpText4': '/images/mwu6.jpg',
},
'newyearbash':{
		'coverImage': '/images/nyb1.jpg',
		'helpText': '/images/nyb2.jpg',
		'helpText1': '/images/nyb3.jpg',
		
		'helpText3': '/images/nyb4.jpg',
		'helpText4': '/images/nyb5.jpg',	
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
