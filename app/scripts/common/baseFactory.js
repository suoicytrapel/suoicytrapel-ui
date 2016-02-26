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
		'event_type': {
		'coverImage': '/images/dummy.jpg',
		'helpText1': '/images/gopal_chat.jpg',
		'helpText2': '/images/gopal_cover.jpg',
		'helpText3': '/images/gopal_sweet.jpg',
		'helpText4': '/images/HotMillions.jpg',	
},

'event_type1':{
		'coverImage': '/images/HotMillions.jpg',	
		'helpText': '/images/dummy.jpg',
		'helpText1': '/images/gopal_chat.jpg',
		'helpText2': '/images/gopal_cover.jpg',
		'helpText3': '/images/gopal_sweet.jpg',
		
},
'event_type2':{
		'coverImage': '/images/gopal_sweet.jpg',
		'helpText': '/images/dummy.jpg',
		'helpText1': '/images/gopal_chat.jpg',
		'helpText2': '/images/gopal_cover.jpg',
		
		'helpText4': '/images/HotMillions.jpg',	
},
'event_type3':{
		'coverImage': '/images/gopal_cover.jpg',
		'helpText': '/images/dummy.jpg',
		'helpText1': '/images/gopal_chat.jpg',
		
		'helpText3': '/images/gopal_sweet.jpg',
		'helpText4': '/images/HotMillions.jpg',	
},
'event_type4':{
		'coverImage': '/images/gopal_chat.jpg',
		'helpText': '/images/dummy.jpg',
		
		'helpText2': '/images/gopal_cover.jpg',
		'helpText3': '/images/gopal_sweet.jpg',
		'helpText4': '/images/HotMillions.jpg',	
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
