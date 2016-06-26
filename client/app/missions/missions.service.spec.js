'use strict';

describe('Service: missions', function () {

  // load the service's module
  beforeEach(module('lifeApp'));

  // instantiate service
  var missions;
  beforeEach(inject(function (_missions_) {
    missions = _missions_;
  }));

  it('should do something', function () {
    expect(!!missions).toBe(true);
  });

});
