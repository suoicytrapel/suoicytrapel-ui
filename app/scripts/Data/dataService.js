app.service('dataService',function(){
	var abc = null;

	this.setImageURLs = function(imageURLs){
		this.imageURLs = imageURLs;
	}
	this.getImageURLs = function(){
		return this.imageURLs;
	}

});