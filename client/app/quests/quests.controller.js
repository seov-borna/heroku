'use strict';
(function(){

class QuestsComponent {
  constructor($http, QuestService) {
    var vm = this;

    vm.quests = QuestService.query();

    vm.createQuest = function(){
      vm.newQuest = new QuestService(vm.newQuest);
      vm.newQuest.$save(function() {
        vm.quests.push(vm.newQuest);
        vm.newQuest = {};
      }, function() {
        alert('Error! Something went wrong');
      });
    };

    vm.deleteQuest = function(index){
      vm.quests[index].$delete(function() {
        vm.quests.splice(index, 1);
      }, function() {
        alert('Error! Something went wrong');
      });
    };

    vm.toggleEdit = function(index){
      vm.quests[index].edit = !vm.quests[index].edit;
    };

    vm.updateQuest = function(index){
      vm.quests[index].$update(function() {
      }, function() {
        alert('Error! Something went wrong');
      });
    };

  }
}

angular.module('lifeApp')
  .component('quests', {
    templateUrl: 'app/quests/quests.html',
    controller: QuestsComponent,
    controllerAs: 'ctrl'
  });

})();
