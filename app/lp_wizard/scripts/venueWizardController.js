wizardApp.controller('venueWizardController', function(crudEventAreaService,crudRoomService ,$mdDialog, venueLookup, Upload, progressbarService, WizardHandler, wizardDataStore) {
	var vm = this;
	vm.messageType = '';
	vm.messageBarMessage = '';

	vm.lookup = venueLookup;
	vm.selectedAreaServices = [];
	vm.selectedCuisines = [];
	vm.selectedBasicCateringServices = [];
	vm.readonly = true;
	vm.removable = false; 
	vm.previewMode = false;
	/* Initialising the object */
	vm.venueWizard = {
		eventAreaAmenities: [],
		venueRooms: [],
		caterDecorAmenities: [],
		vendorAttachments: [],
		menuAttachments: [],
		basicVenueServices: [],
		informationProvidedDate: new Date(),
	};
	/* Obtaining the data from session storage */
	if(wizardDataStore.getWizardData()){
		vm.venueWizard = wizardDataStore.getWizardData().venueWizard;
	}
	
	/* disable progressbar if its still enabled */
	progressbarService.enableProgressbar(false);
	
	vm.createEventArea = function(event){
		crudEventAreaService.showDialog(event).then(function(data){
			vm.venueWizard.eventAreaAmenities.push(angular.copy(data.newData));
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
		vm.venueWizard.eventAreaAmenities.splice(index, 1);
		},function(){
			console.log('Requester cancelled the request');
		});
	};
	
	vm.modifyEventArea = function(event,index,data){
		crudEventAreaService.showDialog(event,index,data).then(function(data){
			vm.venueWizard.eventAreaAmenities[data.index] = angular.copy(data.newData);
		},function(error){
			console.log(error.status);
		});
	};
	
	vm.createRoom = function(event){
		crudRoomService.showDialog(event).then(function(data){
			/*if(data && data.newData.selectedRoomFacilities && data.newData.selectedRoomFacilities.length > 0){
				var facilities = '';
				for(var i=0; i< data.newData.selectedRoomFacilities.length; i++){
					facilities += data.newData.selectedRoomFacilities[i] + ', ';
				}
				data.newData.facilities = facilities.substr(0, (facilities.length -2));
			}*/
			vm.venueWizard.venueRooms.push(angular.copy(data.newData));
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
		vm.venueWizard.venueRooms.splice(index, 1);
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
			vm.venueWizard.venueRooms[data.index] = angular.copy(data.newData);
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
          			vm.imageUploadCustomErrorMsg = 'Maximum of '+ maxUploadLimit + ' images can be uploaded';
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
   	if(vm.basicDetailsForm.$valid){
   		/* calculating latitude and longitude based on address provided */
   		getLatLongfromAddress(vm.venueWizard.addresses.addressLine1);
   		setWizardDataIntoSession('venueWizard', vm.venueWizard);
   		return true;
   	}
   		else{
   			vm.basicDetailsForm.$submitted = true;
   			return false;
   		}
   };
   
   vm.exitEventAreaStep = function(){
   	if(vm.venueWizard.eventAreaAmenities.length < 1){
   		vm.messageType = 'Error';
   		vm.messageBarMessage = "Error Message: Please Enter your venue's eventarea details";
   		return false;
   	}
   	else if(vm.venueWizard.basicVenueServices.length < 1){
   		vm.messageType = 'Error';
   		vm.messageBarMessage = "Error Message: Please select atleast one service you provide";
   		return false;
   	}
   	else{
   		vm.messageType = '';
   		vm.messageBarMessage = "";
   		
   		setWizardDataIntoSession('venueWizard', vm.venueWizard);
   		return true;
   	}
   		
   };
   
   vm.exitCateringDecorStep = function(){
   	
   	if(vm.cateringDecorDetailsForm.$valid){
   		setWizardDataIntoSession('venueWizard', vm.venueWizard);
   			return true;   		
   	}
   		else{
   			vm.cateringDecorDetailsForm.$submitted = true;
   			return false;
   		}
   		
   		
   		
   };
   
   vm.exitPolicyImagesStep = function(){
   	if(vm.policyDetailsForm.$valid){
   		if(vm.venueWizard.vendorAttachments.length < 1){
   			vm.messageType = 'Error';
   			vm.messageBarMessage = "Error Message: Please upload few images of your venue";
   			return false;
   		}
   		else{
   			setWizardDataIntoSession('venueWizard', vm.venueWizard);
   			return true;
   		}
   	}
   	else{
   		vm.policyDetailsForm.$submitted = true;
   		return false;
   	}
   };
   
   vm.exitSignOffStep = function(){
   	if(vm.signOffDetailsForm.$valid){
   		if(vm.signOffDetails.agreementCheckbox)
   		return true;
   		else{
   			vm.messageType = 'Error';
   			vm.messageBarMessage = "Error Message: Please check the agreement checkbox";
   			return false;
   		}
   	}
   	else{
   		vm.signOffDetailsForm.$submitted = true;
   		return false;
   	}
   };
   
   vm.previewModeOn = function(){
   	vm.previewMode = true;
   	WizardHandler.wizard('venueWizard').goTo(0);
   };
   
   vm.previewModeOff = function(){
   	vm.previewMode = false;
   	WizardHandler.wizard('venueWizard').goTo(4);
   };
   
   vm.submitVenueForm = function(){
   	/* REST CALL to submit the form to be put here */
   		console.log('submit REST call');
   		//wizardDataStore.removeWizardData();  /*Remove data from session storage once it is saved in backend*/
   };
   
   function getLatLongfromAddress(address){
   	if(google && google.maps){
   	 var geocoder = new google.maps.Geocoder();
    	if (geocoder) {
        	geocoder.geocode({
            	'address': address
        	}, function (results, status) {
            	if (status == google.maps.GeocoderStatus.OK) {
                vm.venueWizard.addresses.latitude = results[0].geometry.location.lat();
                vm.venueWizard.addresses.longitude = results[0].geometry.location.lng();
            }
        	});
    	}
	}
   }
   
   function setWizardDataIntoSession(objectKey, data){
   	if(wizardDataStore.getWizardData())
   		{
   			var wizardData = wizardDataStore.getWizardData();   			
   		}
   		else{
   			var wizardData = {};
   		}
   		
   		var dataToBeSaved = angular.copy(data);
   		if(dataToBeSaved.vendorAttachments.length>0 || dataToBeSaved.menuAttachments.length>0){
   			dataToBeSaved.vendorAttachments = []; /* Do Not Save vendor images in session storage */
   			dataToBeSaved.menuAttachments = [];	/* Do Not Save menu images in session storage */
   		}
   		wizardData[objectKey] = dataToBeSaved;
   		wizardDataStore.setWizardData(wizardData);
   }
	
});
