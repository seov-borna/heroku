'use strict';
(function(){

class QuestbookComponent {
  constructor(Story, Mission, Quest, $state, $uibModal, $scope) {
    var vm = this;

    vm.stories = null;
    vm.missions = null;

    vm.currentStory = null;

    vm.showObject = showObject;
    vm.currentObject = null;

    vm.filter = {present: true};

    var crudModalSettings = null;

    activate();

    function activate() {
      Story.query(function(stories) {
        vm.stories = stories;
        vm.stories.push({title: 'ALL STORIES'});
        vm.currentStory = {title: 'ALL STORIES'};
        
        Mission.query(function(missions) {
          vm.missions = getPresentMissions(missions);
        });
        vm.currentObject = {};
      }, function() {
        alert('Error! Something went wrong');
      });

      crudModalSettings = {
        controllerAs: 'crudCtrl',
        resolve : {
          questbookObject: function () {
            return vm.currentObject;
          }
        }
      };
    }

    function showObject(object) {
      vm.currentObject = object;
      vm.currentObject.objectType = object.mission ? 'QUEST' : 'MISSION';
      console.log(vm.currentObject);
    }

    // newMission -- editMission -- newQuest -- editQuest
    vm.openCrudModal = function(action) {
      var modalSettings = crudModalSettings;
      modalSettings.controller = action.indexOf('Mission') > -1 ? 'MissionCrudController' : 'QuestCrudController';
      modalSettings.templateUrl = 'app/questbook/crud/' + action + '.modal.html';
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

    vm.toggleFilter = function() {
      if(vm.currentStory.title === 'ALL STORIES') {
        vm.missions = vm.filter.present ? getPresentMissions(vm.missions) : Mission.query();
      } else {
        vm.missions = vm.filter.present ? getPresentMissions(vm.currentStory.missions) : vm.currentStory.missions;
      }
    }

    function getPresentMissions(missions) {
      var presentMissions = [];
      angular.forEach(missions, function(mission) {
        if(mission.status === 'PRESENT')
          presentMissions.push(mission);
      });
      return presentMissions;
    }
  }
}

angular.module('lifeApp')
  .component('questbook', {
    templateUrl: 'app/questbook/ui/questbook.html',
    controller: QuestbookComponent,
    controllerAs: 'ctrl'
  });

})();
