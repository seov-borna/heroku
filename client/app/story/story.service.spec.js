'use strict';

describe('Service: Story', function () {

  // load the service's module
  beforeEach(module('lifeApp'));

  // instantiate service
  var story;
  beforeEach(inject(function (_story_) {
    story = _story_;
  }));

  it('should do something', function () {
    expect(!!story).toBe(true);
  });

});
