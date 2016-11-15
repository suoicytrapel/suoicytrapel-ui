/**
 * @author Anku
 */

app.factory('baseFactory', function($location) {
	var baseFactory = {};
	baseFactory.selectedCity = null;       /* '1' */
	baseFactory.selectedCategory = null;   /* 'VENUE' */
	baseFactory.coverUrl = '/images/main_cover.jpg';
	baseFactory.mainCoverHeading = 'Your Online Event Planner';
	
	baseFactory.categoryMap = {

		 'Venue': 'Venues',
		 'CATERER': 'Caterers',
		 'DECORATOR': 'Decorators',
		 'PHOTOGRAPHER': 'Photographers',
		 'ENTERTAINMENT': 'Entertainment',
		 'OTHERS' : 'Others' 
	};
	
	/*baseFactory.categoryIconsMap = {
		
		'VENUE' : 'fa-university',
		'CATERER' : 'fa-cutlery',
		'DECORATOR' : 'fa-asterisk',
		'PHOTOGRAPHER' : 'fa-camera',
		'ENTERTAINMENT' : 'fa-bar-chart',
		'OTHERS' : 'fa-external-link-square',
	};*/
	
	/*baseFactory.subCategoriesMap = {
		'VENUE' : ['hotels','restaurants','marriage-palaces','banquet-halls','clubs','others'],
		'CATERER': ['veg','non-veg','bartender'],
		 'DECORATOR': ['tenting','lighting','floral','candles','balloons'],
		 'PHOTOGRAPHER': ['photography','videography'],
		 'ENTERTAINMENT': ['dj','singers','dancers','musicians','choreographers','anchors','fireworks','other-acts'],
		 'OTHERS' : ['makeup-artist','jewellery','invites','cab-services','ecoverage','gift-shops','trousseau-packer','accessories','mehendi-artist','clothing'], 
	};*/
	baseFactory.ourPortfolioImageUrls = {
		'Happy-Birthday-Mrs-Kalra': {
		'EventCover': '/images/rkb/rkb1.jpg',
		'Happy Bithday Mrs Kalra Moment2': '/images/rkb/rkb2.jpg',
		'Happy Bithday Mrs Kalra Moment3': '/images/rkb/rkb3.jpg',
		'Happy Bithday Mrs Kalra Moment4': '/images/rkb/rkb4.jpg',
		'Happy Bithday Mrs Kalra Moment5': '/images/rkb/rkb5.jpg',	
},

'Gurmeet-Weds-Ravleen':{
		'EventCover': '/images/gws/gws1.jpg',	
		'Gurmeet Weds Ravleen Moment2': '/images/gws/gws2.jpg',
		'Gurmeet Weds Ravleen Moment3': '/images/gws/gws3.jpg',
		'Gurmeet Weds Ravleen Moment4': '/images/gws/gws4.jpg',
		'Gurmeet Weds Ravleen Moment5': '/images/gws/gws5.jpg',
		'Gurmeet Weds Ravleen Moment6': '/images/gws/gws6.jpg',
		
},
'Mehul-Weds-Uma':{
		'EventCover': '/images/mwu/mwu1.jpg',
		'Mehul Weds Uma Moment2': '/images/mwu/mwu2.jpg',
		'Mehul Weds Uma Moment3': '/images/mwu/mwu3.jpg',
		'Mehul Weds Uma Moment4': '/images/mwu/mwu4.jpg',
		
		'Mehul Weds Uma Moment5': '/images/mwu/mwu5.jpg',	
		'Mehul Weds Uma Moment6': '/images/mwu/mwu6.jpg',
},
'New-Year-Bash-2016':{
		'EventCover': '/images/nyb/nyb1.jpg',
		'New Year Bash 2016 Moment2': '/images/nyb/nyb2.jpg',
		'New Year Bash 2016 Moment3': '/images/nyb/nyb3.jpg',
		
		'New Year Bash 2016 Moment4': '/images/nyb/nyb4.jpg',
		'New Year Bash 2016 Moment5': '/images/nyb/nyb5.jpg',	
},
'Lohri-2016':{
	'EventCover' : '/images/lohri/lohri1.jpg',
	'Lohri 2016 Moment2': '/images/lohri/lohri2.jpg',
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
				baseFactory.mainCoverHeading = 'Your Online Event Planner';
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
