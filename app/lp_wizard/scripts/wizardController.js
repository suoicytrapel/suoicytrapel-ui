wizardApp.controller('wizardController', function(crudEventAreaService,crudRoomService ,$mdDialog, venueLookup) {
	var vm = this;
	vm.eventAreaSelected = [];
	vm.lookup = venueLookup;
	vm.selectedAreaServices = [];
	vm.selectedCuisines = [];
	vm.selectedBasicCateringServices = [];
	vm.readonly = true;
	vm.removable = false; 
	vm.eventAreas = [];
	vm.rooms = [];
	
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
	
	vm.createRoom = function(event){
		crudRoomService.showDialog(event).then(function(data){
			if(data && data.newData.selectedRoomFacilities.length > 0){
				var facilities = '';
				for(var i=0; i< data.newData.selectedRoomFacilities.length; i++){
					facilities += data.newData.selectedRoomFacilities[i] + ', ';
				}
				data.newData.facilities = facilities.substr(0, (facilities.length -2));
			}
			vm.rooms.push(angular.copy(data.newData));
		},function(error){
			if(error)
			console.log(error.status);
		});
	};
	
	vm.deleteRoom = function(event, index){
		  var confirm = $mdDialog.confirm()
          .title('Delete Room')
          .textContent('Are You sure you want to delete this Room?')
          .ariaLabel('Delete Room')
          .targetEvent(event)
          .ok('Delete Room')
          .cancel("Don't Delete Room");
		
		$mdDialog.show(confirm).then(function() {
		vm.rooms.splice(index, 1);
		},function(){
			console.log('Requester cancelled the request');
		});
	};
	
	vm.modifyRoom = function(event,index,data){
		crudRoomService.showDialog(event,index,data).then(function(data){
			if(data && data.newData.selectedRoomFacilities.length > 0){
				var facilities = '';
				for(var i=0; i< data.newData.selectedRoomFacilities.length; i++){
					facilities += data.newData.selectedRoomFacilities[i] + ', ';
				}
				data.newData.facilities = facilities.substr(0, (facilities.length -2));
			}
			vm.rooms[data.index] = angular.copy(data.newData);
		},function(error){
			console.log(error.status);
		});
	};
	
});
