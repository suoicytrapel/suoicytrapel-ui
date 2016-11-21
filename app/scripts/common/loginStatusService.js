(function(angular){
	
app.service('loginStatusService', function() {
	
	var isLoggedIn = false;
	var subject = new Rx.Subject();
	
	return {
		
		setLoginStatus: function(status){
			isLoggedIn = status;
		},
		
		getLoginStatus: function(){
			return isLoggedIn;
		},
		
		getSubjectToSubscribe: function(){
			return subject;
		}
		
	};
});

})(window.angular);
