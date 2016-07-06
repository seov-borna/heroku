'use strict';

describe('Component: QuestbookComponent', function () {

  // load the controller's module
  beforeEach(module('lifeApp'));

  var QuestbookComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    QuestbookComponent = $componentController('QuestbookComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
