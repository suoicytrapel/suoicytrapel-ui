(function(angular){
	
app.service('progressbarService', function() {
	
	var showProgressbar = false;
	var subject = new Rx.Subject();
	
	return {
		
		setProgressbarStatus: function(status){
			showProgressbar = status;
		},
		
		getProgressbarStatus: function(){
			return showProgressbar;
		},
		
		getSubjectToSubscribe: function(){
			return subject;
		},
		
		enableProgressbar: function(status){
			subject.onNext({showProgressbar : status});
		}
		
	};
});

})(window.angular);
