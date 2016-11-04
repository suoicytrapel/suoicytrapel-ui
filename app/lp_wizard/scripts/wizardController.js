wizardApp.controller('wizardController', function(crudEventAreaService, $mdDialog) {
	var vm = this;
	vm.eventAreaSelected = [];
	vm.areaServices = ['Restaurant','Bar','Gym','Spa','Room Service','Medical','Pool','Laundry','Wi-Fi','Parking'];
	vm.selectedAreaServices = [];
	vm.readonly = true;
	vm.removable = false; 
	vm.eventAreas = [];
	
	vm.createEventArea = function(event){
		crudEventAreaService.showDialog(event).then(function(data){
			vm.eventAreas.push(angular.copy(data.newData));
		},function(error){
			if(error)
			console.log(error.status);
		});
	};
	
	vm.deleteEventArea = function(event, index){
		  var confirm = $mdDialog.confirm()
          .title('Delete EventArea')
          .textContent('Are You sure you want to delete this eventarea?')
          .ariaLabel('Delete EventArea')
          .targetEvent(event)
          .ok('Delete EventArea')
          .cancel("Don't Delete EventArea");
		
		$mdDialog.show(confirm).then(function() {
		vm.eventAreas.splice(index, 1);
		},function(){
			console.log('Requester cancelled the request');
		});
	};
	
	vm.modifyEventArea = function(event,index,data){
		crudEventAreaService.showDialog(event,index,data).then(function(data){
			vm.eventAreas[data.index] = angular.copy(data.newData);
		},function(error){
			console.log(error.status);
		});
	};
	
});
