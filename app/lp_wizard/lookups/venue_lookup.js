(function(){
wizardApp.factory('venueLookup', function() {
	var lookup = {};
	
	lookup.eventAreaServices = ['Restaurant','Bar','Gym','Spa','Room Service','Medical','Pool','Laundry','Wi-Fi','Parking'];

	lookup.eventAreaPriceRange = ['0 - 50,000', '50,0001 - 1.0Lac', '1.01Lac - 1.5Lacs', '1.51Lacs - 2.0Lacs', '2.01Lacs - 2.5Lacs', '2.51Lacs - 3.0Lacs', '3.01Lacs - 3.5Lacs', '3.51Lacs - 4.0Lacs', '4.01Lacs - 5.0Lacs', '> 5Lacs', 'Get Quote'];
	
	lookup.eventAreaFullAc = ['Yes', 'No'];
	
	lookup.roomTypes = ['Standard', 'Deluxe', 'Super Deluxe', 'Suite'];
	
	lookup.roomFacilities = ['A/C', 'LCD/LED', 'Hot Water', 'Refrigerator', 'Locker'];
	
	lookup.provideCateringServicesOptions = ['Yes', 'No'];
	
	lookup.provideDecorServicesOptions = ['Yes', 'No'];
	
	lookup.perPlateCostOptions = ['0 - 500', '501 - 800', '801 - 1000', '1001 - 1200', '1201 - 1500', '1501 - 1800', '1801 - 2000', '> 2000'];
	
	lookup.cuisines = ['Indian', 'Italian', 'Mexican', 'Continental', 'Chaat & Street Food', 'Chinese', 'Thai', 'Lebanese'];
	
	lookup.basicCateringServices = ['Crockery', 'Bartending', 'Waiters', 'Food Counters'];
	
	return lookup;
});
})();
