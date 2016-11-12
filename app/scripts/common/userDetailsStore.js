(function(angular){
	
app.factory('userDetailsStore', function(store) {
	
	var currentLoggedInUser = null;
	
	return {
		
		setLoggedInUserDetails: function(userDetails){
			store.set('userDetails',userDetails);
		},
		
		getLoggedInUserDetails: function(){
			currentLoggedInUser = store.get('userDetails');
			return currentLoggedInUser;
		},
		
		removeLoggedInUserDetails: function(){
			store.remove('userDetails');
			console.log('userDetails has been removed');
		}
		
	};
});

})(window.angular);
