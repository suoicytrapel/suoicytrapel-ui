(function(){
wizardApp.factory('catererLookup', function() {
	var lookup = {};
	
	lookup.venueType = {'1':'Hotel','2':'Banquet Hall','3':'Marriage Palace','4':'Restaurant','5':'Club','6':'Resort','7':'Other'};
	
	lookup.city = {'1':'Chandigarh','2':'Bikaner'};
	
	lookup.locality = {'1':'Zirakpur','2':'Panchkula', '3': 'Mohali'};
	
	lookup.eventAreaServices = {'1':'Restaurant','2':'Bar','3':'Gym','4':'Spa','5':'Room Service','6':'Medical','7':'Pool','8':'Laundry','9':'Wi-Fi','10':'Parking'};

	lookup.caterDecorAmenitiesLookup = {'1':'Inhouse Catering','2':'Bartending'};
	
	lookup.additionalVenueServicesLookup = {'1':'Corkage per Bottle', '2': 'Inhouse DJ', '3': 'Inhouse Decor'};
	
	lookup.eventAreaPriceRange = ['0 - 50,000', '50,0001 - 1.0Lac', '1.01Lac - 1.5Lacs', '1.51Lacs - 2.0Lacs', '2.01Lacs - 2.5Lacs', '2.51Lacs - 3.0Lacs', '3.01Lacs - 3.5Lacs', '3.51Lacs - 4.0Lacs', '4.01Lacs - 5.0Lacs', '> 5Lacs', 'Get Quote'];
	
	lookup.eventAreaFullAc = ['Yes', 'No'];
	
	lookup.roomTypes = {'1':'Standard', '2':'Deluxe', '3':'Super Deluxe', '4':'Suite'};
	
	lookup.eventAreaTypes = {'1':'Banquet Hall','2':'Open Hall','3':'Restaurant','4':'Discotheque','5':'Terrace'};
		
	lookup.perPlateCostOptions = ['0 - 500', '501 - 800', '801 - 1000', '1001 - 1200', '1201 - 1500', '1501 - 1800', '1801 - 2000', '> 2000', 'Get Quote'];
	
	lookup.cuisines = ['Indian', 'Italian', 'Mexican', 'Continental', 'Chaat & Street Food', 'Chinese', 'Thai', 'Lebanese'];
	
	lookup.basicCateringServices = ['Crockery', 'Bartending', 'Waiters', 'Food Counters'];
	
	lookup.genericYesNoOptions = ['Yes', 'No'];
	
	lookup.policyVenueServices = {'1':'Outhouse Catering','2':'Outhouse Decor','3':'Outhouse Liquor','4': 'Outhouse DJ'};
	
	return lookup;
});
})();
