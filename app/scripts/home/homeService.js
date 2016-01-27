/**
 * @author Anku
 */

app.service('HomeService',function(){

	var searchParam = null;
	
	this.setSearchParam = function(searchParam){
		this.searchParam = searchParam;
	}

	this.getSearchParam = function(){
		return this.searchParam;
	}

});
