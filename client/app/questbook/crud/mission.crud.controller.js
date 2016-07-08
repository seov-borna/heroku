(function () {
	'use strict';

	function MissionCrudController(Story, Mission, Quest, $scope, $uibModalInstance, questbookObject, User) {
		var vm = this;

		vm.stories = null;
		vm.missions = null;

		vm.newMission = null;
		vm.mission = null;

		vm.missionStatuses = null;

		activate();

		function activate() {

			User.get(function(currentUser) {
		        vm.stories = angular.copy(currentUser.stories);
		        vm.missions = getMissionsByStories(vm.stories);
	    	});

	      	vm.mission = new Mission(questbookObject);

	      	vm.missionStatuses = ['UPCOMING', 'PRESENT', 'COMPLETE'];
		}

		function getMissionsByStories(stories) {
	      var missions = [];
	      angular.forEach(stories, function(story) {
	        angular.forEach(story.missions, function(mission) {
	          missions.push(mission);
	        });
	      });
	      return missions;
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

	    $scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		
	}

	angular
		.module('lifeApp')
		.controller('MissionCrudController', MissionCrudController);
})();
