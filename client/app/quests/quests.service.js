'use strict';

angular.module('lifeApp')
  .service('Quest', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('api/quests/:id', { id: '@_id' }, {
		    update: { method:'PUT' }
		});


  });
