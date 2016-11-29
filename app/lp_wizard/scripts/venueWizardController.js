wizardApp.controller('venueWizardController', function(crudEventAreaService,crudRoomService ,$mdDialog, venueLookup, Upload, progressbarService) {
	var vm = this;
	vm.messageType = '';
	vm.messageBarMessage = '';
	vm.eventAreaSelected = [];
	vm.lookup = venueLookup;
	vm.selectedAreaServices = [];
	vm.selectedCuisines = [];
	vm.selectedBasicCateringServices = [];
	vm.readonly = true;
	vm.removable = false; 
	vm.eventAreas = [];
	vm.rooms = [];
	vm.menuImages = [];
	vm.vendorImages = [];
	vm.signOffDetails = {
		InformationProvidedDate: new Date(),
	};
	/* disable progressbar if its still enabled */
	progressbarService.enableProgressbar(false);
	
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
	
	vm.uploadFiles = function (files, uploadedFilesArray, maxUploadLimit) {
	  var duplicateFile = false;
	  vm.imageUploadCustomErrorMsg = '';	
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          //Upload.upload({..., data: {file: files[i]}, ...})...;
          Upload.base64DataUrl(files[i]).then(function(url){
          	for(var k = 0; k < uploadedFilesArray.length; k++){
          		if(url === uploadedFilesArray[k]){
          			duplicateFile = true;
          			break;
          		}
          	}
          	if(!duplicateFile && uploadedFilesArray.length < maxUploadLimit)
          	uploadedFilesArray.push(url);
          	else{
          		if(duplicateFile){
          			vm.imageUploadCustomErrorMsg = 'Duplicate Upload is not allowed';	
          		}
          		else
          			vm.imageUploadCustomErrorMsg = 'Maximum of 4 images can be uploaded';
          	}
          	
          });
        }
        // or send them all together for HTML5 browsers:
        //Upload.upload({..., data: {file: files}, ...})...;
      }
   };
   
   vm.removeSelectedImg = function(uploadedFilesArray, index){
   	console.log(vm.uploadedMenuImages);
   		uploadedFilesArray.splice(index,1);
   };
   
   vm.exitBasicDetailsStep = function(){
   	if(vm.basicDetailsForm.$valid)
   		return true;
   		else{
   			vm.basicDetailsForm.$submitted = true;
   			return false;
   		}
   };
   
   vm.exitEventAreaStep = function(){
   	if(vm.eventAreas.length < 1){
   		vm.messageType = 'Error';
   		vm.messageBarMessage = "Error Message: Please Enter your venue's eventarea details";
   		return false;
   	}
   	else if(vm.selectedAreaServices.length < 1){
   		vm.messageType = 'Error';
   		vm.messageBarMessage = "Error Message: Please select atleast one service you provide";
   		return false;
   	}
   	else{
   		vm.messageType = '';
   		vm.messageBarMessage = "";
   		return true;
   	}
   		
   };
   
   vm.exitCateringDecorStep = function(){
   	
   	if(vm.cateringDecorDetailsForm.$valid){
   		if(vm.cateringDecorDetails.provideCateringServices === 'Yes'){
   			if(!vm.cateringDecorDetails.selectedCuisines || vm.cateringDecorDetails.selectedCuisines.length < 1){
   				vm.messageType = 'Error';
   				vm.messageBarMessage = "Error Message: Please select atleast one cuisine that you provide in your catering services";
   				return false;
   			}
   			else if(!vm.cateringDecorDetails.selectedBasicCateringServices || vm.cateringDecorDetails.selectedBasicCateringServices.length < 1){
   				vm.messageType = 'Error';
   				vm.messageBarMessage = "Error Message: Please select atleast one catering service that you provide";
   				return false;
   			}
   			else{
   				vm.messageType = '';
   				vm.messageBarMessage = '';
   				return true;
   			}
   		}
   		else{
   			return true;
   		}
   		
   	}
   		else{
   			vm.cateringDecorDetailsForm.$submitted = true;
   			return false;
   		}
   		
   		
   		
   };
	
});
