(function(angular){
	
wizardApp.factory('wizardDataStore', function(store) {
	
	var wizardData = null;
	
	return {
		
		setWizardData: function(data){
			wizardData = data;
			store.set('wizardData',wizardData);
		},
		
		getWizardData : function(){
				if(store.get('wizardData')){
					wizardData = store.get('wizardData');
				}
			
			return wizardData;
		},
		
		removeWizardData: function(){
			store.remove('wizardData');
			console.log('wizardData has been removed');
		}
		
	};
});

})(window.angular);
