'use strict';
(function(){

class MissionsComponent {
  constructor(Story, Mission, Quest, $state, $uibModal, $scope) {
    var vm = this;

    vm.stories = null;
    vm.missions = null;

    vm.currentStory = null;
    vm.changeStory = changeStory;

    vm.showObject = showObject;
    vm.currentObject = null;

    var crudModalSettings = null;

    activate();

    function activate() {
      Story.query(function(stories) {
        vm.stories = stories;
        vm.currentStory = vm.stories[0];
        
        if(vm.currentStory.missions.length > 0) {
          vm.missions = vm.currentStory.missions;
          vm.currentObject = vm.missions[0];
        } else {
          vm.currentObject = {};
        }

        vm.stories.push({title: 'ALL STORIES'});
      }, function() {
        alert('Error! Something went wrong');
      });

      crudModalSettings = {
        templateUrl: 'app/missions/newMission.modal.html',
        controller: 'QuestbookCrudController',
        controllerAs: 'crudCtrl',
        resolve : {
          questbookObject: function () {
            return vm.currentObject;
          }
        }
      };
    }

    function changeStory() {
      if(vm.currentStory.title === 'ALL STORIES') {
        vm.missions = Mission.query();
      } else {
        vm.missions = vm.currentStory.missions;
      }
    }

    function showObject(object) {
      vm.currentObject = object;
      vm.currentObject.type = object.mission ? 'QUEST' : 'MISSION';
      console.log(vm.currentObject);
    }

    // newMission -- editMission -- newQuest -- editQuest
    vm.openCrudModal = function(action) {
      var modalSettings = crudModalSettings;
      modalSettings.templateUrl = 'app/missions/' + action + '.modal.html';
      instantiateModal(modalSettings);
    };

    function instantiateModal(modalSettings) {
      var modalInstance = $uibModal.open(modalSettings);

      modalInstance.result.then(function (object) {
        $state.go($state.current, {}, {reload: true});
      }, function () {
        console.log('dismissed');
      });
    }

  }
}

angular.module('lifeApp')
  .component('missions', {
    templateUrl: 'app/missions/missions.html',
    controller: MissionsComponent,
    controllerAs: 'ctrl'
  });

})();
