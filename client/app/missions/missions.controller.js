'use strict';
(function(){

class MissionsComponent {
  constructor(Mission, Quest, $state, $uibModal, $scope) {
    var vm = this;

    vm.missions = null;

    vm.newMission = null;
    vm.newQuest = null;

    vm.showObject = showObject;
    vm.currentObject = null;

    activate();

    function activate() {
    	Mission.query(function(missions) {
	    	vm.missions = missions;
        vm.currentObject = vm.missions[0];
	    }, function() {
	    	alert('Error! Something went wrong');
	    });
    }

    vm.addMission = function() {
      vm.newMission = {};
    }

    vm.createMission = function(){
      vm.newMission = new Mission(vm.newMission);
      vm.newMission.$save(function() {
        vm.missions.push(vm.newMission);
        vm.newMission = {};
      }, function() {
        alert('Error! Something went wrong');
      });
    };

    vm.deleteMission = function(){
      if(vm.currentObject.type === 'QUEST') {
        vm.currentObject = new Quest(vm.currentObject);
      }
      vm.currentObject.$delete(function() {
        //TODO if mission -> delete all quests

        $state.go($state.current, {}, {reload: true});
      }, function() {
        alert('Error! Something went wrong');
      });
    };

    vm.toggleEdit = function(){
      vm.currentObject.edit = !vm.currentObject.edit;
    };

    vm.updateMission = function() {
      if(vm.currentObject.type === 'QUEST') {
        vm.currentObject.edit = false;
        vm.currentObject = new Quest(vm.currentObject);
      }
      vm.currentObject.$update(function(object) {
        vm.currentObject = object;
      }, function() {
        alert('Error! Something went wrong');
      });
    };

    function showObject(object) {
      vm.currentObject = object;
      vm.currentObject.type = object.mission ? 'QUEST' : 'MISSION';
      console.log(vm.currentObject);
    }

    vm.addQuest = function() {
      vm.newQuest = {};
    }

    vm.createQuest = function() {
      vm.newQuest = new Quest(vm.newQuest);
      vm.newQuest.$save(function() {
        vm.currentObject.quests.push(vm.newQuest);
        vm.newQuest = null;
      }, function() {
        alert('Error! Something went wrong');
      });
    };

    vm.cancelAction = function() {
      if(vm.currentObject.edit) {
        vm.currentObject.edit = false;
      }
      if (vm.newQuest) {
        vm.newQuest = null;
      }
      if(vm.newMission) {
        vm.newMission = null;
      }
    };

  }
}

angular.module('lifeApp')
  .component('missions', {
    templateUrl: 'app/missions/missions.html',
    controller: MissionsComponent,
    controllerAs: 'ctrl'
  });

})();
