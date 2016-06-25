'use strict';
(function(){

class QuestsComponent {
  constructor($http, $scope) {
    this.message = 'Hello';

    $http.get('/api/quests')
    .success(function(data) {
      $scope.quests = data;
      console.log($scope.quests);
    })
    .error(function(err) {
      alert('Error! Something went wrong');
    });

    $scope.createQuest = function(){
      $http.post('/api/quests', $scope.newQuest)
      .success(function(){
        $scope.quests.push($scope.newQuest);
        $scope.newQuest = {};
      })
      .error(function(err){
        alert('Error! Something went wrong');
      });
    };

    $scope.deleteQuest = function(index){
      $http.delete('/api/quests/' + $scope.quests[index]._id)
      .success(function(){
        $scope.quests.splice(index, 1);
      })
      .error(function(err){
        alert('Error! Something went wrong');
      });
    };

    $scope.toggleEdit = function(index){
      $scope.quests[index].edit = !$scope.quests[index].edit;
    };

    $scope.updateQuest = function(index){
      $http.put('/api/quests/' + $scope.quests[index]._id, $scope.quests[index])
      .success(function(){
        $scope.quests[index].edit = false;
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
    controller: QuestsComponent
  });

})();
