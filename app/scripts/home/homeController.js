
app.controller('HomeController', function(HomeFactory, cityMap, $rootScope, $scope) {
	var vm = this;

	vm.selectedCategory = 'VENUE';
	vm.categoryMap = {

		Venues:'VENUE',
		Caterers:'CATERER',
		Decorators:'DECORATOR',
		Photographers:'PHOTOGRAPHER',
		Rentals:'RENTAL',
		Band:'BAND'
	};
	vm.cityMap = cityMap;	
	vm.selectedCity = '1';
	$rootScope.selectedCity = vm.selectedCity;


	vm.init = function() {
		applyAutocomplete();
		showcasePortfolio();
		
	};

	function applyAutocomplete() {
		angular.element('.home-search-box').autocomplete({
			source: function(request, response){
				if(request.term.length > 2){
					var searchRequestDTO = {
						searchType : vm.selectedCategory,
						searchString : request.term,
						cityId : $rootScope.selectedCity
					}
					HomeFactory.loadList.populate(searchRequestDTO).$promise.then(function(data){
						response(data);
					},function(error){
						console.log(error);
					})
					
				}
			}
		});
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

	vm.init();
}); 