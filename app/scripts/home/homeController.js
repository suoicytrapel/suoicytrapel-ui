app.controller('HomeController', function(HomeFactory, $rootScope, $scope, baseFactory, $location, ContactFactory, $timeout) {
	var vm = this;
	vm.init = function() {
		$rootScope.showCover = true;
		vm.portfolioImages = baseFactory.ourPortfolioImageUrls;
        vm.fetchRecentAdditions();
        /* Applying boxer on all images */
      
        
	};
	
	vm.applyLibrariesOnPortfolio = function(){
		showcasePortfolio();
		for(var k in vm.portfolioImages){
       	angular.element('.'+k).boxer({
       		formatter: formatCaptions,
       	});
       }
       
       function formatCaptions($target) {
       	if($target.attr("title") == 'EventCover'){
       		var className = $target.attr("class").split('-');
       		var changedTitle = '';
       		for(var k = 0; k < className.length; k++){
       			changedTitle += className[k] + ' ';
       		}
       		       	$target.attr("title",changedTitle + 'Moment1');
       	}

	return '<h4>' + $target.attr("title") + '</h4>';
}
	};
	
	
	function showcasePortfolio(){
		var mySwiper = new Swiper ('.swiper-container', {
			initialSlide: 2,
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

  vm.fetchRecentAdditions = function(){
        var cityId = baseFactory.getSelectedCity();
        HomeFactory.fetchAdditions.recentAdditions(cityId).$promise.then(function(data){
            vm.recentlyAddedData = data;
           
        },function(error){
            
        });
    };

    vm.fetchDetails = function(name, category){
        var searchParam = name;
        $location.path('/details/' + baseFactory.getSelectedCity() +'/'+ category + '/' + searchParam);
    };

    vm.init();
}); 