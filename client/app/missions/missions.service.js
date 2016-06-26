'use strict';

angular.module('lifeApp')
  .service('Mission', function ($resource) {
	return $resource('api/missions/:id', { id: '@_id' }, {
	    update: { method:'PUT' }
	});
  });
