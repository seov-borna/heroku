'use strict';

angular.module('lifeApp')
  .service('Story', function ($resource) {
    return $resource('api/stories/:id', { id: '@_id' }, {
	    update: { method:'PUT' }
	});
  });
