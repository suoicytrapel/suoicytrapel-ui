app.factory('LoginFactory', function (Constants, $resource) {
   var resetForgotPass= {
        status: false,
        msg: null,
        decodedUsername: null,
    };
    return {
    	setResetForgotPass: function(obj){
            resetForgotPass = obj;
        },
        getResetForgotPass: function(){
            return resetForgotPass;
        },
    	
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
        resetForgotPassword: $resource(Constants.API_HOST + '/user/resetPassword', {}, {
            send:{
                method: "POST",
                isArray: false
            }
        }),
        get: $resource(Constants.API_HOST + '/user/decodeString', {}, {
            decodeUserName:{
                method: "GET",
                isArray: false,
                transformResponse: function(data, header) {
                            return angular.fromJson(data);
                        }
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