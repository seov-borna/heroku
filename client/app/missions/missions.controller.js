'use strict';
(function(){

class MissionsComponent {
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

    function showObject(object) {
      vm.currentObject = object;
      vm.currentObject.objectType = object.mission ? 'QUEST' : 'MISSION';
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
  .component('missions', {
    templateUrl: 'app/missions/missions.html',
    controller: MissionsComponent,
    controllerAs: 'ctrl'
  });

})();
