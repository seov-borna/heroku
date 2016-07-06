(function () {
	'use strict';

	function MissionCrudController(Story, Mission, Quest, $scope, $uibModalInstance, questbookObject) {
		var vm = this;

		vm.stories = Story.query();
		vm.missions = Mission.query();

		vm.newMission = null;
		vm.mission = null;
		vm.newQuest = null;
		vm.quest = null;

		vm.missionStatuses = null;
		vm.questTypes = null;

		activate();

		function activate() {
			if(questbookObject.objectType === 'QUEST') {
	        	vm.quest = new Quest(questbookObject);
	      	} else {
	      		vm.mission = new Mission(questbookObject);
	      	}

	      	vm.missionStatuses = ['UPCOMING', 'PRESENT', 'COMPLETE'];
	      	vm.questTypes = ['DEFAULT', 'DAILY', 'URGENT', 'IMPORTANT'];
		}

		vm.createMission = function(){
	      vm.newMission = new Mission(vm.newMission);
	      vm.newMission.$save(function() {
	      	$uibModalInstance.close(vm.newMission);
	      }, function() {
	        alert('Error! Something went wrong');
	      });
	    };

	    vm.updateMission = function() {
	      vm.mission.$update(function() {
	        $uibModalInstance.close(vm.mission);
	      }, function() {
	        alert('Error! Something went wrong');
	      });
	    };

	    vm.deleteMission = function(){
	      vm.mission.$delete(function(mission) {
	        angular.forEach(mission.quests, function(questId) {
	        	var quest = new Quest(questId);
	        	quest.$delete(function() {
			      }, function() {
			        alert('Error! Something went wrong');
			      });
	        });
	        $uibModalInstance.close(null);
	      }, function() {
	        alert('Error! Something went wrong');
	      });
	    };

	    vm.refreshMissions = function(storyIndex) {
	    	vm.missions = vm.newQuest.story.missions;
	    }

	    $scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		
	}

	angular
		.module('lifeApp')
		.controller('MissionCrudController', MissionCrudController);
})();
