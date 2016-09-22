/**
 * @author Anku
 */

/*
 app.directive('sideRibbon', function($timeout) {
 return {
 restrict : 'EA',
 templateUrl : 'views/ribbon/ribbon.html',

 link : function(scope, element, attrs) {
 //console.log(scope);
 //Redefining the categories for ribbon
 scope.ribbonOpened = false;
 scope.index = -1;
 console.log("scope.selectedCategory = " + scope.selectedCategory);

 scope.selectCategory = function(index){
 console.log('index ' + index);
 angular.element('.ribbon-tab:nth-child(' + (index + 1) + ')').addClass('active').siblings().removeClass('active');
 };

 scope.$watch(function(scope){
 return scope.selectedCategory
 },function(newValue, oldValue){
 console.log('newValue : ' + newValue + '  oldValue : ' + oldValue);
 });

 for(var category in scope.categoryMap){
 scope.index += 1;
 if(scope.categoryMap[category] == scope.selectedCategory){
 $timeout(function(){
 scope.selectCategory(scope.index);
 });
 break;
 }
 }

 },
 };
 });*/

/*
 *Directive for last element of ng-repeat
 *
 * **/
app.directive('onLastRepeatElement', function($timeout) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			if (scope.$last && attrs.onFinishCallback)
				$timeout(function() {
					scope.$eval(attrs.onFinishCallback);
				});
		}
	};
});

/*
 *
 * Directive for filter
 * */

app.directive('filter', function() {
	return {
		restrict : 'EA',
		templateUrl : 'views/data/filter.html',
		scope : {
			expandCollapseFilterFunctionality : "=",
			expandFilter : "=",
			filterHeading : "@",
			filterId : "@",
			filterNodes : "=",

		},
		link : function(scope, elem, attr) {
		}
	};
});

/*
 * Directive for Applying Swiper Carousel
 *
 * */

app.directive('swiperCarousel', function($timeout) {
	return {
		scope : {
			effect : "@",
			grabCursor : "@",
			speed : "@",
			slidesPerView : "@",
			pagination : "@",
			paginationClickable : "@",
			autoPlay : "@",
			spaceBetween : "@",
			breakpoints : "=",
			paginationType : "@",
			coverflow : "=",
			nextButton : "@",
			prevButton : "@",
			preloadImages : "@",
			lazyLoading : "@",
			initialSlide : "@",
			centeredSlides: "@",
			swiperObj: "=",
		},
		link : function(scope, elem, attr) {
			var propertiesObj = {};
			if (scope.effect)
				propertiesObj.effect = scope.effect;
			if (scope.grabCursor)
				propertiesObj.grabCursor = scope.grabCursor === 'true' ? true : false;
			if (scope.speed)
				propertiesObj.speed = Number(scope.speed);
			if (scope.slidesPerView)
				propertiesObj.slidesPerView = scope.slidesPerView;
			if (scope.pagination)
				propertiesObj.pagination = '.' + scope.pagination;
			if (scope.paginationClickable)
				propertiesObj.paginationClickable = scope.paginationClickable === 'true' ? true : false;;
			if (scope.autoPlay)
				propertiesObj.autoplay = Number(scope.autoPlay);
			if (scope.spaceBetween)
				propertiesObj.spaceBetween = Number(scope.spaceBetween);
			if (scope.breakpoints)
				propertiesObj.breakpoints = scope.breakpoints;
			if (scope.paginationType)
				propertiesObj.paginationType = scope.paginationType;
			if (scope.coverflow)
				propertiesObj.coverflow = scope.coverflow;
			if (scope.nextButton)
				propertiesObj.nextButton = '.' + scope.nextButton;
			if (scope.prevButton)
				propertiesObj.prevButton = '.' + scope.prevButton;
			if (scope.preloadImages)
				propertiesObj.preloadImages = scope.preloadImages === 'true' ? true : false ;
			if (scope.lazyLoading)
				propertiesObj.lazyLoading = scope.lazyLoading === 'true' ? true : false;
			if (scope.initialSlide)
				propertiesObj.initialSlide = Number(scope.initialSlide);
			if (scope.centeredSlides)
				propertiesObj.centeredSlides = scope.centeredSlides === 'true' ? true : false;
			/* Binding swiper to the element */
			/* $timeout with time as 0ms will execute after the page has loaded
			 * i.e. after all the ng-repeats have executed */

			$timeout(function() {
				scope.swiperObj = new Swiper(elem, propertiesObj);
			}, 0);

		}
	};

});

/*
 * Directive for Tile Component
 *
 * */
app.directive('tileComponent',function(){
	return {
		template: '<div class="tile-comp-container" ng-mouseover="hoverOverElem();" ng-mouseleave="blurFromElem();"><a href="javascript:void(0)" class=""><img src="" alt=""></img><span class="subcategory-name"></span><div class="overlay_and_text" ng-show="showOverlay">Click to View</div></a></div>',
		scope: {
			width: '@',
			height: '@',
			source: '@',
			hoverText: '@'
		},
		link: function(scope, element, attribute, controller){
			var animationEffects = ['bounce','pulse','rubberBand','shake','swing','tada','wobble','bounceIn','zoomIn'];
			scope.showOverlay = false;
			scope.hoverOverElem = function(){
				var randIndex = Math.floor((Math.random() * 10));
				scope.showOverlay = true;
				element.find('a').addClass('animated ' + animationEffects[randIndex]);
			};
			scope.blurFromElem = function(){
				scope.showOverlay = false;
				element.find('a').removeClass();
			};
			element.find('img').attr('src',scope.source);
			element.find('.subcategory-name').text(scope.hoverText);

		}
	};
	
});
