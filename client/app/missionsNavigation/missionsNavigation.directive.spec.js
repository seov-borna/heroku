'use strict';

describe('Directive: missionsNavigation', function () {

  // load the directive's module and view
  beforeEach(module('lifeApp'));
  beforeEach(module('app/missionsNavigation/missionsNavigation.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<missions-navigation></missions-navigation>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the missionsNavigation directive');
  }));
});
