(function(angular){
	
app.factory('loggedInUserDetails', function() {
	
	function loggedInUserDetails(name, email, accessToken, refreshToken, tokenType){
	this.loggedInUserDetails = {};
	this.loggedInUserDetails.name = name;
	this.loggedInUserDetails.email = email;
	this.loggedInUserDetails.accessToken = accessToken;
	this.loggedInUserDetails.refreshToken = refreshToken;
	this.loggedInUserDetails.tokenType = tokenType;
	
	return this.loggedInUserDetails;
	}
	
	return loggedInUserDetails;
});

})(window.angular);
