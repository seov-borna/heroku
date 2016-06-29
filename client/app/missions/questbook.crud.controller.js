(function () {
	'use strict';

	function QuestbookCrudController(Story, Mission, Quest, $scope, $uibModalInstance, questbookObject) {
		var vm = this;

		vm.stories = Story.query();
		vm.missions = Mission.query();

		vm.newMission = null;
		vm.mission = null;
		vm.newQuest = null;
		vm.quest = null;

		activate();

		function activate() {
			if(questbookObject.type === 'QUEST') {
	        	vm.quest = new Quest(questbookObject);
	      	} else {
	      		vm.mission = new Mission(questbookObject);
	      	}
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

		vm.createQuest = function() {
			vm.newQuest = new Quest(vm.newQuest);
	      vm.newQuest.$save(function() {
	      	$uibModalInstance.close(vm.newQuest);
	      }, function() {
	        alert('Error! Something went wrong');
	      });
	    };

		vm.updateQuest = function() {
	      vm.quest.$update(function() {
	        $uibModalInstance.close(vm.quest);
	      }, function() {
	        alert('Error! Something went wrong');
	      });
	    };

	    vm.deleteQuest = function(){
	      vm.quest.$delete(function() {
	        $uibModalInstance.close(null);
	      }, function() {
	        alert('Error! Something went wrong');
	      });
	    };

	    $scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		
	}

	angular
		.module('lifeApp')
		.controller('QuestbookCrudController', QuestbookCrudController);
})();
