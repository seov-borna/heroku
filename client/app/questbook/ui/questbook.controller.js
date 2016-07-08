'use strict';
(function(){

class QuestbookComponent {
  constructor(Story, Mission, Quest, $state, $uibModal, $scope, User) {
    var vm = this;

    vm.stories = null;
    vm.missions = null;

    vm.currentStory = null;

    vm.showObject = showObject;
    vm.currentObject = null;

    vm.missionStatuses = null;
    vm.filter = 'PRESENT';

    var crudModalSettings = null;

    activate();

    function activate() {
      User.get(function(currentUser) {

        vm.stories = angular.copy(currentUser.stories);
        var missions = getMissionsByStories(vm.stories);
        vm.missions = getMissionsByFilter(missions);

        vm.stories.push({title: 'ALL STORIES'});
        vm.currentStory = {title: 'ALL STORIES'};

        vm.currentObject = {};
      });

      vm.missionStatuses = ['UPCOMING', 'PRESENT', 'COMPLETE'];

      crudModalSettings = {
        controllerAs: 'crudCtrl',
        resolve : {
          questbookObject: function () {
            return vm.currentObject;
          }
        }
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

    function showObject(object) {
      vm.currentObject = object;
      vm.currentObject.objectType = object.mission ? 'QUEST' : 'MISSION';
      console.log(vm.currentObject);
    }

    // newMission -- editMission -- newQuest -- editQuest
    vm.openCrudModal = function(action) {
      var modalSettings = crudModalSettings;
      modalSettings.controller = action.indexOf('Mission') > -1 ? 'MissionCrudController' : action+'CrudController';
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
        var missions = getMissionsByStories(vm.stories);
        vm.missions = getMissionsByFilter(missions);
      } else {
        vm.missions = getMissionsByFilter(vm.currentStory.missions);
      }
    }

    function getMissionsByFilter(missions) {
      var presentMissions = [];
      angular.forEach(missions, function(mission) {
        if(mission.status === vm.filter)
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
