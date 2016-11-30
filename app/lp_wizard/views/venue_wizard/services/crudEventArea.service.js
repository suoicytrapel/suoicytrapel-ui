(function (angular) {
'use strict';

    wizardApp.service('crudEventAreaService', function ($mdMedia,$mdDialog) {

        // we could do additional work here too
        return {
            showDialog: function (event,index,data) {
                var self = this;
                var useFullScreen = false; //($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

                return $mdDialog.show({
                    controller: crudEventAreaController,
                    controllerAs: 'vm',
                    templateUrl: 'lp_wizard/views/venue_wizard/crudEventArea.template.html',
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
        };

    });

    function crudEventAreaController($mdDialog, rowInfo, $scope, index, venueLookup) {
        var vm = this;
        //vm.eventAreaPriceRange = ['< 50,000', '< 1Lac', '< 1.5Lacs', '< 2Lacs', '< 2.5Lacs', '< 3Lacs', '< 3.5Lacs', '< 4Lacs', '< 5Lacs', '> 5Lacs', 'Get Quote'];
        //vm.fullAcOptions = ['Yes', 'No'];
        vm.lookup = venueLookup;
        vm.index = null;
        if(rowInfo){
        vm.eventArea = angular.copy(rowInfo);
        vm.index = index;
        }
        
         vm.hide = function () {
        	 if(vm.newEventAreaForm.$valid){
        		 $mdDialog.hide({newData: vm.eventArea, index: vm.index});
        	 }
        	 else{
        		
        		 vm.newEventAreaForm.$submitted = true;
        	 }
         };
         vm.cancel = function () {
             $mdDialog.cancel({status: 'User Ended the Request to Add/Modify Event Area'});
         };
         
    }


})(window.angular)
