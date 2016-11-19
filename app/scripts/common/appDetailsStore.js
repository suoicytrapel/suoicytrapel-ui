(function(angular){
	
app.factory('appDetailsStore', function(store) {
	
	var appDetails = {
		selectedCity : null,
		selectedCategory: null
	};
	
	return {
		
		setSelectedCity: function(selectedCity){
			appDetails.selectedCity = selectedCity;
			store.set('appDetails',appDetails);
		},
		
		setSelectedCategory: function(selectedCategory){
			appDetails.selectedCategory = selectedCategory;
			store.set('appDetails',appDetails);
		},
		
		getAppDetails : function(){
			if(!appDetails.selectedCity && !appDetails.selectedCategory){
				if(store.get('appDetails')){
					appDetails = store.get('appDetails');
				}
			}
			return appDetails;
		},
		
		removeAppDetails: function(){
			store.remove('appDetails');
			console.log('appDetails has been removed');
		}
		
	};
});

})(window.angular);
