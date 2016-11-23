app.factory('LoginFactory', function (Constants, $resource) {
   
    return {
    	
        createUser: $resource(Constants.API_HOST + '/user/create', {}, {
            create:{
                method: "POST",
                isArray: false
            }
        }),
        forgotPwd: $resource(Constants.API_HOST + '/user/forgotPassword', {}, {
            send:{
                method: "GET",
                isArray: false
            }
        }),
        resetPwd: function(token){
        	return $resource(Constants.API_HOST_SECURED + '/user/resetPassword', {}, {
            send:{/* username: email, password: password oldPassword : oldPassword*/
                method: "POST",
                headers: {'Authorization': token},
                isArray: false
            }
        });
        },
        user: function(token){
        	return $resource(Constants.API_HOST_SECURED + '/getUserDetails', {}, {
            getLoggedInUser:{
                method: "GET",
                headers: {'Authorization': token},
                isArray: false
            }
        });
        }
    };
});