'use strict';

describe('Component: QuestsComponent', function () {

  // load the controller's module
  beforeEach(module('lifeApp'));

  var QuestsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    QuestsComponent = $componentController('QuestsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
