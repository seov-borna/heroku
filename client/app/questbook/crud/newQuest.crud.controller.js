(function () {
	'use strict';

	function newQuestCrudController(Story, Mission, Quest, $scope, $uibModalInstance, questbookObject) {
		var vm = this;

		vm.stories = Story.query();
		vm.missions = Mission.query();

		vm.newQuest = null;

		vm.questTypes = null;

		activate();

		function activate() {

	      	vm.questTypes = ['DEFAULT', 'DAILY', 'URGENT', 'IMPORTANT'];

	      	vm.newQuest= {
	      		story: questbookObject.story,
	      		mission: questbookObject,
	      		type: 'DEFAULT'
	      	};
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
