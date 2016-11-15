app.factory('detailFactory', function (Constants, $resource) {
   
    return {
    	
        review: function(token){
        	return $resource(Constants.API_HOST_SECURED + '/review', {}, {
            save:{
                method: "GET",
                headers: {'Authorization': token},
                isArray: false
            }
        });
        }
    };
});