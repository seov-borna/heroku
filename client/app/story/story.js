'use strict';

angular.module('lifeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('story', {
        url: '/story',
        template: '<story></story>'
      });
  });
