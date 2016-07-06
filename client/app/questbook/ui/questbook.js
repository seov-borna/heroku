'use strict';

angular.module('lifeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questbook', {
        url: '/questbook',
        template: '<questbook></questbook>'
      });
  });
