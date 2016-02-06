app.service('dataService',function(){

	var name = null;
	
	this.setName = function(name){
		this.name = name;
	};

	this.getName = function(){
		return this.name;
	};

});