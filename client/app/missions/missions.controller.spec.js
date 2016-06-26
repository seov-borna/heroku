'use strict';

describe('Component: MissionsComponent', function () {

  // load the controller's module
  beforeEach(module('lifeApp'));

  var MissionsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MissionsComponent = $componentController('MissionsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
