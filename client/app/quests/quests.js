'use strict';

angular.module('lifeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('quests', {
        url: '/quests',
        template: '<quests></quests>'
      });
  });
