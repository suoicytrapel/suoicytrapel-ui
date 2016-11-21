app.factory('detailFactory', function (Constants, $resource) {
   
    return {
    	
        review: function(token){
        	return $resource(Constants.API_HOST_SECURED + '/review/submit', {}, {
            save:{
                method: "POST",
                headers: {'Authorization': token},
                isArray: false
            }
        });
        },
        getReview: function(){
            return $resource(Constants.API_HOST + '/review/getAllReviews', {}, {
            getReviewsByVendor:{
                method: "POST",
                isArray: false
            }
        });
        }
    };
});