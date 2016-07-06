(function () {
	'use strict';

	function editQuestCrudController(Quest, $scope, $uibModalInstance, questbookObject) {
		var vm = this;

		vm.quest = null;
		vm.questTypes = null;

		activate();

		function activate() {
			vm.questTypes = ['DEFAULT', 'DAILY', 'URGENT', 'IMPORTANT'];
			
	        vm.quest = new Quest(questbookObject);
		}

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
		.controller('editQuestCrudController', editQuestCrudController);
})();
