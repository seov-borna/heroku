'use strict';
(function(){

class QuestsComponent {
  constructor($http) {
    var vm = this;

    $http.get('/api/quests')
    .success(function(data) {
      vm.quests = data;
      console.log(vm.quests);
    })
    .error(function(err) {
      alert('Error! Something went wrong');
    });

    vm.createQuest = function(){
      $http.post('/api/quests', vm.newQuest)
      .success(function(){
        vm.quests.push(vm.newQuest);
        vm.newQuest = {};
      })
      .error(function(err){
        alert('Error! Something went wrong');
      });
    };

    vm.deleteQuest = function(index){
      $http.delete('/api/quests/' + vm.quests[index]._id)
      .success(function(){
        vm.quests.splice(index, 1);
      })
      .error(function(err){
        alert('Error! Something went wrong');
      });
    };

    vm.toggleEdit = function(index){
      vm.quests[index].edit = !vm.quests[index].edit;
    };

    vm.updateQuest = function(index){
      $http.put('/api/quests/' + vm.quests[index]._id, vm.quests[index])
      .success(function(){
        vm.quests[index].edit = false;
      })
      .error(function(err){
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
