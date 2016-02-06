app.factory('ContactFactory', function (Constants, $resource) {

    return {
        submitEnquiry: $resource(Constants.API_HOST + '/contactus', {}, {
            submit:{
                method: "POST",
                isArray: false
            }
        })
    };
});