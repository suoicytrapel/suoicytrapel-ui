
app.controller('HomeController', function(HomeFactory, cityMap, $rootScope, $scope, baseFactory, $location, HomeService) {
	var vm = this;
	vm.cityMap = cityMap;	
	

	vm.init = function() {
		showcasePortfolio();
	};
	

	
	
	
	function showcasePortfolio(){
		var mySwiper = new Swiper ('.swiper-container', {
			initialSlide: 3,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 22,
            stretch: 0,
            depth: 110,
            modifier: 1,
            slideShadows : true
        },
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        preloadImages: false,
        lazyLoading: true,
        spaceBetween: 20,
  });      
	}

	/*$scope.showPosition = function (position) {
    $scope.lat = position.coords.latitude;
    $scope.lng = position.coords.longitude;
    $scope.accuracy = position.coords.accuracy;
    $scope.$apply();

    var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
    var geocoder = new google.maps.Geocoder();  
     geocoder.geocode({'latLng': latlng}, function(results, status)
            {
                if (status == google.maps.GeocoderStatus.OK)
                 {
                        if (results[0])
                        {
                            var add= results[0].formatted_address ;
                            var  value=add.split(",");

                            count=value.length;
                            
                            city=value[count-3];
                            city = city.replace(" ", "");
                            angular.forEach(vm.cityMap, function(cityName, cityId) {
                            	if(city == cityName){
                            		$rootScope.selectedCity = cityId;
                            	}
                            	$rootScope.selectedCity ="1";
														});
                            //callback(latlng);
                   //         alert(city);
                        }
                        else 
                        {
                  				alert("address not found");
                        }
                }
            });
    };
 
        $scope.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
            $scope.$apply();
        };
 
        $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }*/

	vm.init();
}); 