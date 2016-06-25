'use strict';

describe('Service: QuestService', function () {

  // load the service's module
  beforeEach(module('lifeApp'));

  // instantiate service
  var QuestService;
  beforeEach(inject(function (_quests_) {
    QuestService = _quests_;
  }));

  it('should do something', function () {
    expect(!!QuestService).toBe(true);
  });

});
