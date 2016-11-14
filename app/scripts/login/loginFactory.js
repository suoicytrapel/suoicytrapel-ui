app.factory('LoginFactory', function (Constants, $resource, userDetailsStore, loginStatusService) {
   /*var tokenType = null;
    var accessToken = null;

    loginStatusService.getSubjectToSubscribe().subscribe(function(result){
        tokenType = userDetailsStore.getLoggedInUserDetails() ? userDetailsStore.getLoggedInUserDetails().tokenType : null;
        accessToken = userDetailsStore.getLoggedInUserDetails() ? userDetailsStore.getLoggedInUserDetails().accessToken : null;
    });*/
    return {
        createUser: $resource(Constants.API_HOST + '/user/create', {}, {
            create:{
                method: "POST",
                isArray: false
            }
        }),
        forgotPwd: $resource(Constants.API_HOST + '/forgotPwd/send', {}, {
            send:{
                method: "POST",
                isArray: false
            }
        }),
        user: $resource(Constants.API_HOST_SECURED + '/getUserDetails', {}, {
            getLoggedInUser:{
                method: "GET",
                headers: {'Authorization': userDetailsStore.getLoggedInUserDetails().tokenType + ' ' + userDetailsStore.getLoggedInUserDetails().accessToken},
                isArray: false
            }
        })
    };
});