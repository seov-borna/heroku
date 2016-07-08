(function () {
	'use strict';

	function newQuestCrudController(Story, Mission, Quest, $scope, $uibModalInstance, questbookObject, User) {
		var vm = this;

		vm.stories = null;
		vm.missions = null;

		vm.newQuest = null;

		vm.questTypes = null;

		activate();

		function activate() {
			User.get(function(currentUser) {
		        vm.stories = angular.copy(currentUser.stories);
		        vm.missions = getMissionsByStories(vm.stories);
	    	});

	      	vm.questTypes = ['DEFAULT', 'DAILY', 'URGENT', 'IMPORTANT'];

	      	vm.newQuest= {
	      		story: questbookObject.story,
	      		mission: questbookObject,
	      		type: 'DEFAULT'
	      	};
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

		vm.createQuest = function() {
			vm.newQuest = new Quest(vm.newQuest);
	      vm.newQuest.$save(function() {
	      	$uibModalInstance.close(vm.newQuest);
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
		.controller('newQuestCrudController', newQuestCrudController);
})();
