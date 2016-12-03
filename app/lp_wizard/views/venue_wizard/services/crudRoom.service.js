(function (angular) {
'use strict';

    wizardApp.service('crudRoomService', function ($mdMedia,$mdDialog) {

        // we could do additional work here too
        return {
            showDialog: function (event,index,data) {
                var self = this;
                var useFullScreen = false; //($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

                return $mdDialog.show({
                    controller: crudRoomController,
                    controllerAs: 'vm',
                    templateUrl: 'lp_wizard/views/venue_wizard/crudRoom.template.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    locals: {
                    	
                    	index: index,
                    	rowInfo: data,
                		
                    	
                    },
                });
                /*.then(function (modifiedInfo) {
                    self.modifiedInfo = modifiedInfo;
                }, function () {
                    self.status = 'You cancelled the dialog.';
                });*/

            }
        }

    });

    function crudRoomController($mdDialog, rowInfo, $scope, index, venueLookup) {
        var vm = this;
        //vm.eventAreaPriceRange = ['< 50,000', '< 1Lac', '< 1.5Lacs', '< 2Lacs', '< 2.5Lacs', '< 3Lacs', '< 3.5Lacs', '< 4Lacs', '< 5Lacs', '> 5Lacs', 'Get Quote'];
        //vm.fullAcOptions = ['Yes', 'No'];
        vm.lookup = venueLookup;
        vm.index = null;
        vm.readonly = true;
	    vm.removable = false;
	    vm.messageType = '';
	    vm.messageBarMessage = '';
	    vm.errorMsg = '';
	    vm.room ={
	    	selectedRoomFacilities: []
	    };
        if(rowInfo){
        vm.room = angular.copy(rowInfo);
        vm.selectedRoomFacilities = vm.room.selectedRoomFacilities;
        vm.index = index;
        }
        
         vm.hide = function () {
        	 if(vm.newRoomForm.$valid){
        	 	if(!vm.room.selectedRoomFacilities || vm.room.selectedRoomFacilities.length < 1){
        	 		vm.messageType = 'Error';
	    			vm.messageBarMessage = 'Error Message: Please select atleast one room facility';
        	 	}
        	 	else
        		 $mdDialog.hide({newData: vm.room, index: vm.index});
        	 }
        	 else{
        		
        		 vm.newRoomForm.$submitted = true;
        	 }
         };
         vm.cancel = function () {
             $mdDialog.cancel({status: 'User Ended the Request to Add/Modify Room'});
         };
         
     }


})(window.angular)
