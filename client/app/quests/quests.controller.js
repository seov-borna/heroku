'use strict';
(function(){

class QuestsComponent {
  constructor($http, Quest, Mission) {
    var vm = this;

    vm.quests = Quest.query();
    vm.missions = Mission.query();
    vm.newQuest = null;

    vm.createQuest = function(){
      vm.newQuest = new Quest(vm.newQuest);
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
      console.log(vm.quests[index]);
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
