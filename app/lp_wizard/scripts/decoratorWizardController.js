wizardApp.controller('decoratorWizardController', function($mdDialog, decoratorLookup, Upload, progressbarService, WizardHandler, wizardDataStore) {
	var vm = this;
	vm.messageType = '';
	vm.messageBarMessage = '';

	vm.lookup = decoratorLookup;


	vm.previewMode = false;
	/* Initialising the object */
	vm.decoratorWizard = {
		vendorAttachments: [],
		informationProvidedDate: new Date(),
		decoratorServices: [],
	};
	/* Obtaining the data from session storage */
	if(wizardDataStore.getWizardData()){
		vm.decoratorWizard = wizardDataStore.getWizardData().decoratorWizard;
	}
	
	/* disable progressbar if its still enabled */
	progressbarService.enableProgressbar(false);
	
	
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
   		getLatLongfromAddress(vm.decoratorWizard.addresses.addressLine1);
   		setWizardDataIntoSession('decoratorWizard', vm.decoratorWizard);
   		return true;
   	}
   		else{
   			vm.basicDetailsForm.$submitted = true;
   			return false;
   		}
   };
   
   
   vm.exitCateringDecorStep = function(){
   	
   	if(vm.cateringDecorDetailsForm.$valid){
   		setWizardDataIntoSession('decoratorWizard', vm.decoratorWizard);
   			return true;   		
   	}
   		else{
   			vm.cateringDecorDetailsForm.$submitted = true;
   			return false;
   		}
   		
   		
   		
   };
   
   vm.exitPolicyImagesStep = function(){
   	if(vm.policyDetailsForm.$valid){
   		if(vm.decoratorWizard.vendorAttachments.length < 1){
   			vm.messageType = 'Error';
   			vm.messageBarMessage = "Error Message: Please upload few images of your vendor";
   			return false;
   		}
   		else{
   			setWizardDataIntoSession('decoratorWizard', vm.decoratorWizard);
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
   	WizardHandler.wizard('decoratorWizard').goTo(0);
   };
   
   vm.previewModeOff = function(){
   	vm.previewMode = false;
   	WizardHandler.wizard('decoratorWizard').goTo(4);
   };
   
   vm.submitVendorForm = function(){
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
                vm.decoratorWizard.addresses.latitude = results[0].geometry.location.lat();
                vm.decoratorWizard.addresses.longitude = results[0].geometry.location.lng();
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
