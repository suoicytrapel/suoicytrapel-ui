app.service('dataService',function(){
	/*
	this.setName = function(name){
		this.name = name;
	};

	this.getName = function(){
		return this.name;
	};*/

	this.setImageURLs = function(imageURLs){
		this.imageURLs = imageURLs;
	}
	this.getImageURLs = function(){
		return this.imageURLs;
	}

});