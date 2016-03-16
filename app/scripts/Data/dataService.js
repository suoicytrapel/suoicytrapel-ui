app.service('dataService',function(){

	this.setImageURLs = function(imageURLs){
		this.imageURLs = imageURLs;
	}
	this.getImageURLs = function(){
		return this.imageURLs;
	}

});