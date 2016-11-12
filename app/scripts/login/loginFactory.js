app.factory('LoginFactory', function (Constants, $resource) {

    return {
        user: $resource(Constants.API_HOST + '/user/create', {}, {
            create:{
                method: "POST",
                isArray: false
            }
        })
    };
});