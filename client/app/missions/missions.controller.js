'use strict';
(function(){

class MissionsComponent {
  constructor(Mission, Quest) {
    var vm = this;

    vm.missions = null;

    vm.showMission = showMission;

    activate();

    function activate() {
    	Mission.query(function(missions) {
	    	vm.missions = missions;
	    }, function() {
	    	alert('Error! Something went wrong');
	    });
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

    vm.deleteMission = function(index){
      vm.missions[index].$delete(function() {
        vm.missions.splice(index, 1);
      }, function() {
        alert('Error! Something went wrong');
      });
    };

    vm.toggleEdit = function(index){
      vm.missions[index].edit = !vm.missions[index].edit;
    };

    vm.updateMission = function(index){
      vm.missions[index].$update(function() {
      }, function() {
        alert('Error! Something went wrong');
      });
    };

    function showMission(index) {
    	var selector = '.collapse[data-id="' + vm.missions[index]._id + '"]';
		$(selector).toggle();
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
