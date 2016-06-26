'use strict';

angular.module('lifeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('missions', {
        url: '/missions',
        template: '<missions></missions>'
      });
  });
