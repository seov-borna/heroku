'use strict';

angular.module('lifeApp.auth', ['lifeApp.constants', 'lifeApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
