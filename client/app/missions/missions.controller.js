'use strict';
(function(){

class MissionsComponent {
  constructor(Mission, Quest, $state, $uibModal, $scope) {
    var vm = this;

    vm.missions = null;

    vm.showObject = showObject;
    vm.currentObject = null;

    var crudModalSettings = null;

    activate();

    function activate() {
    	Mission.query(function(missions) {
	    	vm.missions = missions;
        vm.currentObject = vm.missions[0];
	    }, function() {
	    	alert('Error! Something went wrong');
	    });

      crudModalSettings = {
        templateUrl: 'app/missions/newMission.modal.html',
        controller: 'QuestbookCrudController',
        controllerAs: 'crudCtrl',
        resolve : {
          questbookObject: function () {
            return vm.currentObject;
          }
        }
      };
    }

    function showObject(object) {
      vm.currentObject = object;
      vm.currentObject.type = object.mission ? 'QUEST' : 'MISSION';
      console.log(vm.currentObject);
    }

    // newMission -- editMission -- newQuest -- editQuest
    vm.openCrudModal = function(action) {
      var modalSettings = crudModalSettings;
      modalSettings.templateUrl = 'app/missions/' + action + '.modal.html';
      instantiateModal(modalSettings);
    }

    function instantiateModal(modalSettings) {
      var modalInstance = $uibModal.open(modalSettings);

      modalInstance.result.then(function (object) {
        $state.go($state.current, {}, {reload: true});
      }, function () {
        console.log('dismissed');
      });
    }

  }
}

angular.module('lifeApp')
  .component('missions', {
    templateUrl: 'app/missions/missions.html',
    controller: MissionsComponent,
    controllerAs: 'ctrl'
  });

})();
